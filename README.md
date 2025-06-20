For proper intergration, it is highly recommended to start with backend set up before moving to frontend

1. clone and open it with Gitpod.
2. Type `npm install wouter formik  yup axios jotai immer seamless-immutable react stripe`

In the root frontend_pos create a new file and name it .env
In the .env file add these line in 

```````
VITE_API_URL= Replace with your https://localhost
JWT_SECRET=Replace the same JWT with Backen
STRIPE_SECRET_KEY=Refer to backend readme.md file
VITE_STRIPE_PUBLISHABLE_KEY=Refer to backend Readme.md file
```````


Type `cd frontend_pos` and enter
lastly, Test your React installation with `npm run dev`



Opening the browser will bring you to login page
![image](https://github.com/user-attachments/assets/4d55e481-37cd-47d0-9ee9-e9de55a17314)
However at this stage, no new user has been created. 

Click on the Register Page
![Screenshot 2025-06-20 195337](https://github.com/user-attachments/assets/7ae179b8-1aa0-4f80-8bd4-6dd5969d6355)

Create the new user based on the field requirement
![image](https://github.com/user-attachments/assets/d3f30950-59c0-4dcc-8d7d-7c6d3f31b73f)
Ensure both password and confirm Password is the same. 

Once the register is completed can do a verification on Profile Page
![Screenshot 2025-06-20 195956](https://github.com/user-attachments/assets/941983f1-520c-4b4f-81f3-cdc7c5b99a1c)
It should have values in the boxes except password. 

In Profile Page you are able to:
Edit- make sure all the values intended to change has been alter and input the old password and click Update Profile
![Screenshot 2025-06-20 200424](https://github.com/user-attachments/assets/c67678ad-488b-432e-8a1b-af172b0147cb)

Delete- make sure all the values are present including password and click delete
![Screenshot 2025-06-20 200723](https://github.com/user-attachments/assets/9edf4aed-3038-454d-bda2-dae8a1b56b41)

Which option you choose, make sure to verify with backend Customers tab
![Screenshot 2025-06-20 200945](https://github.com/user-attachments/assets/e3781391-56ac-4116-a280-38e66d5ff707)

Menu Ordering
Click on the Home button, it will navigate to the Menu Page
![Screenshot 2025-06-20 201418](https://github.com/user-attachments/assets/ab9ced71-e193-4e72-8377-eef740e4787b)

Feel free to add any of items to cart by clicking Add to Cart. It will redirect to Cart page
![image](https://github.com/user-attachments/assets/d0d56893-d2f0-45c1-98c1-b678761b82bf)
At this juncture, you can choose to edit/ delete or go back to Home page to continue to add menu to cart. 

Once you are satified with the cart order. Click on the Checkout button to the payment process
![Screenshot 2025-06-20 201942](https://github.com/user-attachments/assets/f40fa2fc-298f-4085-b303-6d516caf7a62)












