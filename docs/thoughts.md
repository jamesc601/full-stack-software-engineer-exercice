## 1. Initial setup

During initial setup, I noticed a couple of small issues with the README:

- There is a need to cd into the `backend` folder before running `npm run migrate` and `npm run seed`
- There is no instruction to install dependencies

These are both small issues and can be navigated with intuition but I aim to tidy the README up if there is time

The `package-lock.json` files are not in source control. This will be the first change before I get into any other work.

There is also a high severity vulnerability warning when installing both frontend dependencies and a backend dependency warning. I don't plan to address these as they are almost certainly out of scope.
