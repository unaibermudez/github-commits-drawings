#!/bin/bash

# Set the repository path (assumes you're already in the repository)
REPO_PATH=$(pwd)

# Start from the first day of January 2021
START_DATE="2021-01-01"
END_DATE="2021-01-31"

# Loop over all days in January 2021
for DATE in $(seq -f "%02g" 1 31); do
  # Format the date to YYYY-MM-DD
  CURRENT_DATE="2021-01-$DATE"
  
  # Change the date in the system (this will be reflected in the commit)
  export GIT_AUTHOR_DATE="$CURRENT_DATE 12:00:00"
  export GIT_COMMITTER_DATE="$CURRENT_DATE 12:00:00"
  
  # Make a commit (you can change the commit message as needed)
  git commit --allow-empty -m "Commit for $CURRENT_DATE"
  
  # Optionally, you can push the commits after each one, or do it once at the end
  # git push origin main
  
done

# Optionally push all commits after loop
git push origin main
