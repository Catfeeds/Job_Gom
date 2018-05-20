#!/bin/bash

ORIGIN=$1
BRANCH=$2

REPOADDR=$ORIGIN

LINKADDR=$REPOADDR/commit/


rm Changelog.md

while read TAG; do
    if [ ! $CURRENT ]; then
        REV="--all"
        CURRENT=1
        echo "     " >> Changelog.md
        echo "*(CURRENT)*" >> Changelog.md
        echo "---" >> Changelog.md
    else
        REV=$TAG
        echo "     " >> Changelog.md
        echo *$NEXT* >> Changelog.md
        echo "---" >> Changelog.md
    fi

    echo "     " >> Changelog.md
    git log --no-merges --date=short  --pretty=format:"- %ad (%an) %s -> [view commit](${LINKADDR}%h)" $TAG..$NEXT  >> Changelog.md
    echo "     " >> Changelog.md

    NEXT=$TAG
done < <(git for-each-ref --sort='*authordate' --format='%(refname)' refs/heads/$BRANCH)

COMMITID=`git rev-list $NEXT | head -n 1`
LINKADDR=$REPOADDR/commit/$COMMITID
echo "     " >> Changelog.md
echo *$NEXT* >> Changelog.md
echo "---" >> Changelog.md
echo "     " >> Changelog.md
git log --no-merges --date=short  --pretty=format:"- %ad (%an) %s -> [view commit](${LINKADDR}%h)" $NEXT >> Changelog.md
echo "     " >> Changelog.md

#git add Changelog.md
#git commit -am "Edit Changelog.md"

exit 0