import { useState } from "react";
import { Button } from "../button/button";
import styles from "./table.module.css";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import Link from "next/link";
import { Input as ChakraInput } from "@chakra-ui/input";
import { FormControl } from "@chakra-ui/form-control";

export const OrderTable = ({ orders }) => {
  const [detailActive, setDetailActive] = useState(null);

  const onClose = () => {
    setDetailActive(null);
  };

  const selected = orders.find((o) => o.id === detailActive);

  return (
    <>
      <table className={`${styles.container} ${styles.table}`}>
        <tbody>
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
              <tr key={`row-${order.id}`}>
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
        </tbody>
      </table>
      <Modal size="6xl" isCentered isOpen={!!detailActive} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {selected && (
              <>
                <h2>Order #{selected.id}</h2>
                <OrderDetailTable order={selected} onClose={onClose} />
                <div className={styles.buttonContainer}>
                  <Button onClick={onClose}>Close order</Button>
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const OrderDetailTable = ({ order }) => {
  return (
    <table className={styles.table}>
      <tbody>
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
      </tbody>
    </table>
  );
};

export const OrderSummaryTable = ({
  lines,
  subtotal,
  shipping,
  total,
  discountTotal,
  needsDelivered,
  vat,
}) => {
  return (
    <>
      <table
        className={`${styles.container} ${styles.table} ${styles.noMargin}`}
      >
        <tbody>
          <tr>
            <th className={styles.hideOnMobile}>Type</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>

          {lines.map((line) => {
            return (
              <tr key={line.name}>
                <td className={styles.hideOnMobile}>{line.type}</td>
                <td>
                  <Link href={line.resourceHref}>
                    <a className={styles.link}>{line.name}</a>
                  </Link>
                </td>
                <td className={styles.center}>{line.quantity}</td>
                <td>{line.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className={`${styles.container} ${styles.table}`}>
        <tbody>
          <tr>
            <td className={styles.tableHeader}>Subtotal</td>
            <td className={`${styles.cost} ${styles.rightAlignText}`}>
              {subtotal}
            </td>
          </tr>
          {discountTotal !== "£0.00" && (
            <tr>
              <td className={styles.tableHeader}>Discount </td>
              <td className={`${styles.rightAlignText} ${styles.cost} `}>
                -{discountTotal}
              </td>
            </tr>
          )}
          {needsDelivered && (
            <tr>
              <td className={styles.tableHeader}>Shipping</td>
              <td className={`${styles.rightAlignText} ${styles.shipping}`}>
                <p className={`${styles.cost} ${styles.bold}`}>{shipping}</p>
              </td>
            </tr>
          )}
          {vat !== "£0.00" && (
            <tr>
              <td className={styles.tableHeader}>VAT</td>
              <td className={`${styles.rightAlignText} ${styles.shipping}`}>
                <p className={`${styles.cost} ${styles.bold}`}>{vat}</p>
              </td>
            </tr>
          )}
          <tr>
            <td className={styles.tableHeader}>Total</td>
            <td
              className={`${styles.cost} ${styles.bold} ${styles.rightAlignText}`}
            >
              {total}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export const BasketTable = ({ lines, onQuantityChange }) => {
  return (
    <table className={`${styles.container} ${styles.table}`}>
      <tbody>
        <tr>
          <th className={styles.hideOnMobile}>Type</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>

        {lines.map((line) => {
          return (
            <tr key={line.name}>
              <td className={styles.hideOnMobile}>{line.type}</td>
              <td>
                <Link href={line.resourceHref}>
                  <a className={styles.link}>{line.name}</a>
                </Link>
              </td>
              <td className={styles.center}>
                {line.lockQuantityEditing ? (
                  <>
                    <QuantityInput
                      disabled
                      placeholder="0"
                      name="quantity"
                      ariaLabel={`Quantity for ${line.name}`}
                      defaultValue={line.quantity}
                      onChange={onQuantityChange(line)}
                    />
                  </>
                ) : (
                  <>
                    {line.allowQuantityEditing ? (
                      <QuantityInput
                        placeholder="0"
                        name="quantity"
                        ariaLabel={`Quantity for ${line.name}`}
                        defaultValue={line.quantity}
                        onChange={onQuantityChange(line)}
                      />
                    ) : (
                      <QuantityInput
                        placeholder="0"
                        name="quantity"
                        ariaLabel={`Quantity for ${line.name}`}
                        defaultValue={line.quantity}
                        onChange={onQuantityChange(line)}
                        max={1}
                      />
                    )}
                  </>
                )}
              </td>
              <td>{line.price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const TotalsTable = ({
  subtotal,
  shipping,
  total,
  discountTotal,
  needsDelivered,
  vat,
}) => {
  return (
    <table className={`${styles.container} ${styles.table}`}>
      <tbody>
        <tr>
          <td className={styles.tableHeader}>Subtotal</td>
          <td className={`${styles.cost} ${styles.rightAlignText}`}>
            {subtotal}
          </td>
        </tr>
        {discountTotal !== "£0.00" && (
          <tr>
            <td className={styles.tableHeader}>Discount </td>
            <td className={`${styles.rightAlignText} ${styles.cost} `}>
              -{discountTotal}
            </td>
          </tr>
        )}
        {needsDelivered && (
          <tr>
            <td className={styles.tableHeader}>Shipping</td>
            <td className={`${styles.rightAlignText} ${styles.shipping}`}>
              <p className={`${styles.cost} ${styles.bold}`}>{shipping}</p>
              <p>Shipping options will be updated during checkout.</p>
            </td>
          </tr>
        )}
        {vat !== "£0.00" && (
          <tr>
            <td className={styles.tableHeader}>VAT</td>
            <td className={`${styles.rightAlignText} ${styles.shipping}`}>
              <p className={`${styles.cost} ${styles.bold}`}>{vat}</p>
            </td>
          </tr>
        )}
        <tr>
          <td className={styles.tableHeader}>Total</td>
          <td
            className={`${styles.cost} ${styles.bold} ${styles.rightAlignText}`}
          >
            {total}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const QuantityInput = ({
  placeholder,
  name,
  ariaLabel,
  id,
  defaultValue,
  onChange,
  max,
  disabled = false,
}) => {
  return (
    <>
      <FormControl className={styles.formControl} id={id}>
        <ChakraInput
          width="80px"
          className={styles.input}
          backgroundColor={"#F5F5F5"}
          placeholder={placeholder}
          name={name}
          type="number"
          aria-label={ariaLabel}
          textAlign="center"
          defaultValue={defaultValue === null ? "" : defaultValue}
          onChange={onChange}
          min={0}
          max={max}
          disabled={disabled}
        />
      </FormControl>
    </>
  );
};
