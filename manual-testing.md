# Manual Testing

I hate manual testing, but for now its the only way we can test the Edwiser Moodle stuff. But yes it makes me sad. This testing guide outlines tests to follow to make sure all the edwiser stuff is working as expected, hopefully with detailed testing plans they will be repeatable.

# Test scenarios

## Buy for a new user

### Test steps

1. Open a fresh incognito tab
2. Navigate to a free course ([For example](https://acecentre.org.uk/learning/becoming-a-communication-partner-i-11th-jan-2022))
3. Click book this course (x2)
4. Click checkout
5. Fill in the form
   1. Use an email address you have access too
   2. Use the password `password`
   3. Don't tick `Email me`
6. Click place order
7. Click `My Ace Centre`
8. Click `View your courses`
9. Click on the course
10. Check your email for emails

### Cleanup

1. Close incognito tab
2. Login to moodle as an Admin
3. [Go to bulk user actions](https://learning.acecentre.org.uk/admin/user/user_bulk.php)
4. Filter by email
5. Remove all those users
6. Login to wordpress as an admin
7. [Go to list of users](https://backend.acecentre.org.uk/wp-admin/users.php?orderby=registered&order=desc)
8. Remove added users
9. Find course product ([For example](https://backend.acecentre.org.uk/wp-admin/post.php?post=29420&action=edit))
10. Increase stock count by 1

## Buy for an existing user

### Test steps

1. Open a fresh incognito tab
2. Go to `/my-acecentre`
3. Register an account with an email address you own
4. Use `password` as the password
5. Don't sign up for news
6. Check your email
7. Navigate to a free course ([For example](https://acecentre.org.uk/learning/becoming-a-communication-partner-i-11th-jan-2022]))
8. Click book course (x2)
9. Click checkout
10. Fill in the form
    1. Use the same email address
    2. Don't check email me
11. Click place order
12. Click `My Ace Centre`
13. Click `View your courses`
14. Click on the course
15. Check your email

### Cleanup

1. Close incognito tab
2. Login to moodle as an Admin
3. [Go to bulk user actions](https://learning.acecentre.org.uk/admin/user/user_bulk.php)
4. Filter by email
5. Remove all those users
6. Login to wordpress as an admin
7. [Go to list of users](https://backendacecentre.org.uk/wp-admin/users.php?orderby=registered&order=desc)
8. Remove added users
9. Find course product ([For example](https://backend.acecentre.org.uk/wp-admin/post.php?post=29420&action=edit))
10. Increase stock count by 1

## Simple delegation

### Test steps

1. Open the wordpress admin panel
2. [Navigate to create a new coupon](https://backend.acecentre.org.uk/wp-admin/post-new.php?post_type=shop_coupon)
3. Generate a code
4. Set it to 100% discount
5. Set usage limit to 1
6. Open an incognito tab
7. Find a paid course and add 1 to your basket ([For example](https://acecentre.org.uk/learning/splash-training-i))
8. Apply coupon code
9. Click checkout
10. Fill out form
11. Use an email you can view
12. Set password to password
13. Tick the `would you like to enroll a different user` button
14. Enter a different email address
15. Click place order
16. Go to My Ace Centre
17. Make sure there are no courses and one order
18. Check your email
19. Close and open incognito
20. Login with the credentials sent to the learner email
21. Check my courses
22. Click on course
23. Logout

### Cleanup

1. Close incognito tab
2. Login to moodle as an Admin
3. [Go to bulk user actions](https://learning.acecentre.org.uk/admin/user/user_bulk.php)
4. Filter by email
5. Remove all those users
6. Login to wordpress as an admin
7. [Go to list of users](https://backend.acecentre.org.uk/wp-admin/users.php?orderby=registered&order=desc)
8. Remove added users
9. Find course product ([For example](https://backend.acecentre.org.uk/wp-admin/post.php?post=25939&action=edit))
10. Increase stocks count by 1

## Group booking (2 users)

### Test steps

1. Open the wordpress admin panel
2. [Navigate to create a new coupon](https://backend.acecentre.org.uk/wp-admin/post-new.php?post_type=shop_coupon)
3. Generate a code
4. Set it to 100% discount
5. Set usage limit to 1
6. Open an incognito tab
7. Find a paid course and add 2 to your basket ([For example](https://acecentre.org.uk/learning/splash-training-i))
8. Apply coupon code
9. Click checkout
10. Fill out form
11. Use three email addresses you control
12. Set password to `password`
13. Place order
14. Check that the booker doesn't have a course
15. Check email
16. Sign in to both learner accounts and check you can get on the course

### Cleanup

1. Close incognito tab
2. Login to moodle as an Admin
3. [Go to bulk user actions](https://learning.acecentre.org.uk/admin/user/user_bulk.php)
4. Filter by email
5. Remove all those users
6. Login to wordpress as an admin
7. [Go to list of users](https://backend.acecentre.org.uk/wp-admin/users.php?orderby=registered&order=desc)
8. Remove added users
9. Find course product ([For example](https://backend.acecentre.org.uk/wp-admin/post.php?post=25939&action=edit))
10. Increase stocks count by 1

## Group booking (1 current user + 1 new user)

### Test steps

1. Open the wordpress admin panel
2. [Navigate to create a new coupon](https://backend.acecentre.org.uk/wp-admin/post-new.php?post_type=shop_coupon)
3. Generate a code
4. Set it to 100% discount
5. Set usage limit to 1
6. Open an incognito tab
7. Find a paid course and add 2 to your basket ([For example](https://acecentre.org.uk/learning/splash-training-i))
8. Apply coupon code
9. Click checkout
10. Fill out form
11. Use two email addresses you control, reuse the billing email address as a student
12. Set password to `password`
13. Place order
14. Check that the logged in booker has the course available in My Ace Centre
15. Check emails
16. Log in as second learner
17. Check access to course

### Cleanup

1. Close incognito tab
2. Login to moodle as an Admin
3. [Go to bulk user actions](https://learning.acecentre.org.uk/admin/user/user_bulk.php)
4. Filter by email
5. Remove all those users
6. Login to wordpress as an admin
7. [Go to list of users](https://backend.acecentre.org.uk/wp-admin/users.php?orderby=registered&order=desc)
8. Remove added users
9. Find course product ([For example](https://backend.acecentre.org.uk/wp-admin/post.php?post=25939&action=edit))
10. Increase stocks count by 1

## Combination of group booking and delegating

### Test steps

1. Open the wordpress admin panel
2. [Navigate to create a new coupon](https://backend.acecentre.org.uk/wp-admin/post-new.php?post_type=shop_coupon)
3. Generate a code
4. Set it to 100% discount
5. Set usage limit to 1
6. Open an incognito tab
7. Find a paid course and add 5 to your basket ([For example](https://acecentre.org.uk/learning/splash-training-i))
8. Find a paid course and add 1 to your basket ([For example](https://acecentre.org.uk/learning/implementing-the-pragmatics-profile-for-people-who-use-aac-d-9th-30th-march-2022))
9. Apply coupon code
10. Click checkout
11. Fill out form
12. Use emails you control for all the seats
13. Use password for the password
14. Delegate the paid course seat
15. Place order
16. Check slack + Email
17. Login with user from each group and check it works

### Cleanup

1. Close incognito tab
2. Login to moodle as an Admin
3. [Go to bulk user actions](https://learning.acecentre.org.uk/admin/user/user_bulk.php)
4. Filter by email
5. Remove all those users
6. Login to wordpress as an admin
7. [Go to list of users](https://backend.acecentre.org.uk/wp-admin/users.php?orderby=registered&order=desc)
8. Remove added users
9. Find course products ([For example](https://backend.acecentre.org.uk/wp-admin/post.php?post=25939&action=edit))
10. Increase stocks count by 1

## Multiple large group bookings

### Test steps

1. Open the wordpress admin panel
2. [Navigate to create a new coupon](https://backend.acecentre.org.uk/wp-admin/post-new.php?post_type=shop_coupon)
3. Generate a code
4. Set it to 100% discount
5. Set usage limit to 1
6. Open an incognito tab
7. Find a paid course and add 5 to your basket ([For example](https://acecentre.org.uk/learning/splash-training-i))
8. Find another paid course and add 5 to your basket
9. Repeat twice more
10. Apply coupon code
11. Checkout
12. Fill in form
13. Use password for the password
14. Place order
15. Check slack + Email
16. Login with user from each group and check it works

### Cleanup

1. Close incognito tab
2. Login to moodle as an Admin
3. [Go to bulk user actions](https://learning.acecentre.org.uk/admin/user/user_bulk.php)
4. Filter by email
5. Remove all those users
6. Login to wordpress as an admin
7. [Go to list of users](https://backend.acecentre.org.uk/wp-admin/users.php?orderby=registered&order=desc)
8. Remove added users
9. Find course products ([For example](https://backend.acecentre.org.uk/wp-admin/post.php?post=25939&action=edit))
10. Increase stocks count by 5

## Pay for a course

### Test steps

1. Open an incognito tab
2. Find a paid course and add 5 to your basket ([For example](https://acecentre.org.uk/learning/splash-training-i))
3. Go to checkout, look at basket cost.
4. Open wordpress admin panel
5. [Navigate to create a new coupon](https://backend.acecentre.org.uk/wp-admin/post-new.php?post_type=shop_coupon)
6. Generate a code that covers all of the cost (-30p)
7. Apply the coupon in incognito
8. Complete checkout

### Cleanup

1. Close incognito tab
2. Login to moodle as an Admin
3. [Go to bulk user actions](https://learning.acecentre.org.uk/admin/user/user_bulk.php)
4. Filter by email
5. Remove all those users
6. Login to wordpress as an admin
7. [Go to list of users](https://backend.acecentre.org.uk/wp-admin/users.php?orderby=registered&order=desc)
8. Remove added users
9. Find course products ([For example](https://backend.acecentre.org.uk/wp-admin/post.php?post=25939&action=edit))
10. Increase stocks count by 5
