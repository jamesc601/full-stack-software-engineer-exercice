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
