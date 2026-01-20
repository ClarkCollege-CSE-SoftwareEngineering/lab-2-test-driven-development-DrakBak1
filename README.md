Jarryd Toves
Professor Nelson

This project demonstrates testing coverage using vitest by building a shopping cart function that calculates item amount, prices, discounts, and taxes. Its purpose is to demonstrate test-driven-development (TDD) and how it ensures efficient project functionality and robust edge case exploration.

Functions implemented are as follows:
-applyDiscount: takes item amount and price if applicable and processes them to return for a price total. 

-calculateTax: This function passes item amount and price allowing it to check whether or not it is taxable, how much it is taxable by, then assert the new price with the increased taxable amount

-calculateTotal: calculate total calculates the culmination of the previous two functions using the cart struct. this is the final check for a carts processing journey.

Reflection question 1: We write a failing test first to see if the test registers, and if the test returns a correct behavior. Fowler states that this is state verification which is a style of testing that determines whether an existing exercise worked correctly by examining the state of the SUT and its collaborators after the method was exercised.

Reflection question 2: This form of testing is using the mockist style of testing, the test is created with an interesting behavior to see if it will run as expected should it arise. Then if the test passes with the expected outcome it is known for certain that the code will run as expected.

Reflection question 3: A test that would do implementation details looks like a mockist test, one where the coder is forced to think about the implementation of the behavior.
