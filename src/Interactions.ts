import {goToLeaf, isLogicBox, LogicBox, LogicBoxOptions} from './misc';

export interface Interactions<E extends object> {
    isReadOnly: boolean;
    canCreateLeaf: (index: number[]) => boolean;
    canAddElement: (size: number) => boolean;
    canUpdateElement: (index: number[]) => boolean;
    canRemoveElement: (index: number[], isLogicBox: boolean) => boolean;
    changeType: (index: number[], newType: string) => void;
    createLeaf: (index: number[]) => void;
    addElement: (index: number[]) => void;
    updateElement: (index: number[], newElement: E) => void;
    moveElement: (index: number[], newIndex: number[]) => void;
    removeElement: (index: number[]) => void;
}

export default function getInteractions<K extends string, E extends object, P extends {}>(
    logicBox: LogicBox<K, E, P>, elementsKey: K, options: LogicBoxOptions, exactNumberOfElements?: number,
    add?: () => E, onChange?: (newLogicBox: LogicBox<K, E, P>, prevLogicBox: LogicBox<K, E, P>) => void): Interactions<E> {
    const isReadOnly = onChange === undefined;
    const canCreateLeaf = (index: number[]) => !isReadOnly && add !== undefined && index.length > 0;
    const canAddElement = (size: number) => !isReadOnly && add !== undefined
        && (!exactNumberOfElements || size < exactNumberOfElements)
    const canUpdateElement = (index: number[]) => !isReadOnly && index.length > 0;
    const canRemoveElement = (index: number[], isLogicBox: boolean) => !isReadOnly && index.length > 0
        && (!exactNumberOfElements || isLogicBox);

    function changeType(index: number[], newType: string) {
        const logicBoxNew = JSON.parse(JSON.stringify(logicBox));
        const leaf = goToLeaf(logicBoxNew, elementsKey, index);

        if (!isReadOnly && isLogicBox(leaf, elementsKey)) {
            leaf.type = newType;
            onChange(logicBoxNew, logicBox);
        }
    }

    function createLeaf(index: number[]) {
        const logicBoxNew = JSON.parse(JSON.stringify(logicBox));
        const leaf = goToLeaf(logicBoxNew, elementsKey, index.slice(0, -1));
        const lastIdx = index[index.length - 1];

        if (canCreateLeaf(index)) {
            const newElements = [leaf[elementsKey][lastIdx], add!()];
            while (exactNumberOfElements && newElements.length < exactNumberOfElements)
                newElements.push(add!());

            leaf[elementsKey][lastIdx] = {
                type: Object.keys(options)[0],
                [elementsKey]: newElements
            };

            onChange!(logicBoxNew, logicBox);
        }
    }

    function addElement(index: number[]) {
        const logicBoxNew = JSON.parse(JSON.stringify(logicBox));
        const leaf = goToLeaf(logicBoxNew, elementsKey, index);
        const elements = leaf[elementsKey];

        if (canAddElement(elements.length)) {
            elements.push(add!());
            while (exactNumberOfElements && elements.length < exactNumberOfElements)
                elements.push(add!());

            onChange!(logicBoxNew, logicBox);
        }
    }

    function updateElement(index: number[], newElement: E) {
        const logicBoxNew = JSON.parse(JSON.stringify(logicBox));
        const leaf = goToLeaf(logicBoxNew, elementsKey, index.slice(0, -1));

        if (canUpdateElement(index)) {
            leaf[elementsKey][index[index.length - 1]] = newElement;
            onChange!(logicBoxNew, logicBox);
        }
    }

    function moveElement(index: number[], newIndex: number[]) {
        if (canUpdateElement(index) && canUpdateElement(newIndex)) {
            const logicBoxNew = JSON.parse(JSON.stringify(logicBox));
            const curLeaf = goToLeaf(logicBoxNew, elementsKey, index.slice(0, -1));
            const newLeaf = goToLeaf(logicBoxNew, elementsKey, newIndex.slice(0, -1));
            const lastCurIdx = index[index.length - 1];
            const lastNewIdx = newIndex[newIndex.length - 1];
            const node = curLeaf[elementsKey][lastCurIdx];

            if (canRemoveElement(index, isLogicBox(node, elementsKey)) && canAddElement(newLeaf[elementsKey].length)) {
                newLeaf[elementsKey].splice(lastNewIdx, 0, node);
                curLeaf[elementsKey].splice(lastCurIdx, 1);
                onChange!(logicBoxNew, logicBox);
            }
        }
    }

    function removeElement(index: number[]) {
        const logicBoxNew = JSON.parse(JSON.stringify(logicBox));
        const leaf = goToLeaf(logicBoxNew, elementsKey, index.slice(0, -1));
        const lastIdx = index[index.length - 1];
        const node = leaf[elementsKey][lastIdx];

        if (canRemoveElement(index, isLogicBox(node, elementsKey))) {
            if (exactNumberOfElements && isLogicBox(node, elementsKey))
                leaf[elementsKey][lastIdx] = node[elementsKey][0];
            else {
                leaf[elementsKey].splice(lastIdx, 1);
                if (index.slice(0, -1).length > 0 && leaf[elementsKey].length === 1) {
                    const parentLeaf = goToLeaf(logicBoxNew, elementsKey, index.slice(0, -2));
                    parentLeaf[elementsKey][index.slice(0, -1)[0]] = leaf[elementsKey][0];
                }
            }

            onChange!(logicBoxNew, logicBox);
        }
    }

    return {
        isReadOnly, canCreateLeaf, canAddElement, canUpdateElement, canRemoveElement,
        changeType, createLeaf, addElement, updateElement, moveElement, removeElement
    };
}
