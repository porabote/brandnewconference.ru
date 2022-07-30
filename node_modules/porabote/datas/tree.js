class Tree {

    buildNestedList(source) {

        let sortedListByParent = this.sortListByParent(source);

        let target = {};
        for (let lft in source) {
            if (!source[lft]['parent_id']) {
                target[source[lft]['lft']] = source[lft];
                if (typeof sortedListByParent[source[lft]['id']] !== "undefined") {
                    target[source[lft]['lft']]['children'] = this.setTreeItems(sortedListByParent[source[lft]['id']], sortedListByParent)
                }
            }
        }
        return target
    }

    setTreeItems(items, sortedListByParent) {
        for (let lft in items) {
            if (typeof sortedListByParent[items[lft]['id']] !== "undefined") {
                items[lft]['children'] = this.setTreeItems(sortedListByParent[items[lft]['id']], sortedListByParent)
            }
        }
        return items
    }

    sortListByParent(source) {
        let target = {};
        for (let lft in source) {
            if (typeof target[source[lft]['parent_id']] === "undefined") {
                target[source[lft]['parent_id']] = {}
            }
            target[source[lft]['parent_id']][source[lft]['id']] = source[lft];
        }
        return target;
    }
}

export default new Tree