## 1. Initial setup

During initial setup, I noticed a couple of small issues with the README:

- There is a need to cd into the `backend` folder before running `npm run migrate` and `npm run seed`
- There is no instruction to install dependencies

These are both small issues and can be navigated with intuition but I aim to tidy the README up if there is time

The `package-lock.json` files are not in source control. This will be the first change before I get into any other work.

There is also a high severity vulnerability warning when installing both frontend dependencies and a backend dependency warning. I don't plan to address these as they are almost certainly out of scope.

## 2. Early bug triage observations

After launching the app and doing a quick exploratory pass, I identified three issues:

- The `/api/graphql` endpoint is being hit continuously, which leads to identification errors.
- Clicking a completed task moves it to the bottom of the list.
- Clicking **Cancel** while creating a new task still inserts a new task.

I am confident that items 1 and 3 are clear bugs. For item 2, I need more product/context validation before deciding whether this is actually incorrect behavior or intended list sorting.

Planned next steps are to address item 1 first (app-breaking), then item 3 (clear user-flow bug), and investigate item 2 afterward.

## 3. Next step: list behavior investigation

As I have worked on this project, it has been clear to me that the list isn't working as expected.

The toggling of an item in the list is not as expected. When clicking on a done item, it does not toggle back to pending. After inspecting the code, going back to pending is the clear intention.

The items also appear to be in a different order sometimes, so I will need to investigate and fix what causes this.

## 4. Prioritization for next fixes

I have been asked to choose from the following potential improvements:

- Remove inefficient queries (N+1 problems)
- Add validation and error handling
- Fix database insert return values
- Proper async/await handling
- Frontend re-render optimization
- Optimistic UI updates or proper refetching

I will prioritize and fix the following, with reasoning:

- Fix database insert return values: this is an API contract correctness issue and is more than an optimization; something is currently incorrect here.
- Add validation and error handling: this prevents crashes and undefined behavior in common user flows.

The remaining options are mostly micro-optimizations and are lower priority for this pass.

I believe I already fixed the N+1 query problem as part of my bug fix for task ordering.

## 5. Validation and error handling reflections

The validation and error handling improvements I've implemented represent a good enough solution for the application in its current state and scale, given the time constraints I set for this work.

One potential improvement would be to reconsider which errors we want to display to end users. For example, the error message "Task id must be a positive integer" is not particularly user-friendly, as users don't directly input task IDs—this is more of an internal validation message that leaked into the user-facing API.

If the size of the application were to increase significantly, the approach to error handling and display could be evolved to be more scalable. This might include:
- Creating separate error types for user-facing vs. internal errors
- Implementing a more sophisticated error mapping system
- Customizing error messages and handling based on specific scenarios and contexts
