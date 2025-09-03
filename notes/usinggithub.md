# Using GitHub and Git

GitHub and Git are used to manage version history and work together on projects. Generally, projects are organized into repositories where multiple people can push, pull, commit, and add files to make development flow in a more natural way

## General GitHub Flow

1. Clone the repository
2. Make changes necessary
3. Add changes to a commit with `git add .` or `git add [specific file]`
4. Commit the changes with `git commit -m "Your commit message"`
5. Push the changes to the remote repository with `git push`

Every time that you log in, you should pull the latest changes from the repository with `git pull`.

Commit often in case issues arise and you need to revert back to previous changes. If multiple people are working on the same project, create separate branches to work on different features at the same time without creating conflicts. When the feature is complete, use `git merge` to merge the branches back together.
