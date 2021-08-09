import { useState } from "react";
import { Button } from "../button/button";
import styles from "./table.module.css";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import Link from "next/link";

export const OrderTable = ({ orders }) => {
  const [detailActive, setDetailActive] = useState(null);

  const onClose = () => {
    setDetailActive(null);
  };

  const selected = orders.find((o) => o.id === detailActive);

  return (
    <>
      <table className={`${styles.container} ${styles.table}`}>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Cost</th>
          <th>Details</th>
        </tr>
        {orders.map((order) => {
          const date = new Date(order.date);
          const formattedDate = new Intl.DateTimeFormat("en-GB", {
            dateStyle: "medium",
          }).format(date);

          return (
            <tr key={`row-${order.name}`}>
              <td>#{order.id}</td>
              <td>{formattedDate}</td>
              <td>{order.status}</td>
              <td>{order.cost}</td>
              <td>
                <Button onClick={() => setDetailActive(order.id)}>
                  Details
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
      <Modal size="6xl" isCentered isOpen={!!detailActive} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {selected && (
              <OrderDetailTable order={selected} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const OrderDetailTable = ({ order, onClose }) => {
  return (
    <>
      <h2>Order #{order.id}</h2>
      <table className={styles.table}>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {order.lines.map((line) => {
          return (
            <tr key={line.name}>
              <td>{line.type}</td>
              <td>
                <Link href={line.href}>
                  <a>{line.name}</a>
                </Link>
              </td>
              <td>{line.quantity}</td>
              <td>{line.total}</td>
            </tr>
          );
        })}
        <div className={styles.buttonContainer}>
          <Button onClick={onClose}>Close order</Button>
        </div>
      </table>
    </>
  );
};
