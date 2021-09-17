# Manual Testing

I hate manual testing, but for now its the only way we can test the Edwiser Moodle stuff. But yes it makes me sad. This testing guide outlines tests to follow to make sure all the edwiser stuff is working as expected, hopefully with detailed testing plans they will be repeatable.

# Test scenarios

## Buy for a new user

### Test steps

1. Open a fresh incognito tab
2. Navigate to a free course ([For example](https://netlify.acecentre.org.uk/learning/becoming-a-communication-partner-i-11th-jan-2022]))
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
7. [Go to list of users](https://acecentre.org.uk/wp-admin/users.php?orderby=registered&order=desc)
8. Remove added users
9. Find course product ([For example](https://acecentre.org.uk/wp-admin/post.php?post=29420&action=edit))
10. Increase stock count by 1

## Buy for an existing user

### Test steps

1. Open a fresh incognito tab
2. Go to `/my-acecentre`
3. Register an account with an email address you own
4. Use `password` as the password
5. Don't sign up for news
6. Check your email
7. Navigate to a free course ([For example](https://netlify.acecentre.org.uk/learning/becoming-a-communication-partner-i-11th-jan-2022]))
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
7. [Go to list of users](https://acecentre.org.uk/wp-admin/users.php?orderby=registered&order=desc)
8. Remove added users
9. Find course product ([For example](https://acecentre.org.uk/wp-admin/post.php?post=29420&action=edit))
10. Increase stock count by 1

## Simple delegation

## Delegation to an existing user

## Group booking (2 users)

## Group booking (1 existing 1 new)

## Combination of group booking and existing user

## Large group booking

## Multiple large group bookings
