import React, {FunctionComponent, memo, useState} from 'react';
import {DndContext, DragOverlay, DragStartEvent, closestCenter} from '@dnd-kit/core';
import type {DragEndEvent} from '@dnd-kit/core/dist/types';
import LogicBoxLeaf from './LogicBoxLeaf';
import LogicBoxLeafPlaceholder from './LogicBoxLeafPlaceholder';
import getInteractions from './Interactions';
import {
    LogicBox as LogicBoxType,
    goToLeaf,
    LogicBoxOptions,
    LeafComponentProps,
    TreeComponentProps,
    PassingLogicBoxProps,
    LeafPlaceholderComponentProps,
    TreePlaceholderComponentProps
} from './misc';
import './style.css';

export const defaultOptions = {
    and: {
        shortLabel: 'AND',
        label: 'All conditions must be met'
    },
    or: {
        shortLabel: 'OR',
        label: 'At least one of the conditions must be met'
    }
};

interface LogicBoxProps<K extends string, E extends object, P extends {}> {
    logicBox: LogicBoxType<K, E, P>;
    elementsKey: K;
    className?: string;
    options?: LogicBoxOptions;
    LeafComponent: FunctionComponent<LeafComponentProps<K, E, P>>;
    TreeComponent?: FunctionComponent<TreeComponentProps<K, E, P>>;
    LeafPlaceholderComponent?: FunctionComponent<LeafPlaceholderComponentProps<K, E, P>>;
    TreePlaceholderComponent?: FunctionComponent<TreePlaceholderComponentProps<K, E, P>>;
    add?: () => E;
    onChange?: (newLogicBox: LogicBoxType<K, E, P>, prevLogicBox: LogicBoxType<K, E, P>) => void;
    exactNumberOfElements?: number;
}

function LogicBox<K extends string, E extends object, P extends {} = {}>(
    {
        logicBox,
        elementsKey,
        className,
        options = defaultOptions,
        LeafComponent,
        TreeComponent,
        LeafPlaceholderComponent,
        TreePlaceholderComponent,
        add,
        onChange,
        exactNumberOfElements
    }: LogicBoxProps<K, E, P>) {
    if (exactNumberOfElements && exactNumberOfElements < 2) {
        console.warn('If LogicBox is applied with `exactNumberOfElements`, the minimum number should be 2!');
        exactNumberOfElements = undefined;
    }

    const [activeIndex, setActiveIndex] = useState<number[] | null>(null);
    const interactions = getInteractions(logicBox, elementsKey, options, exactNumberOfElements, add, onChange);
    const idToIndex = (id: string) => id.split('-').map(idx => parseInt(idx));

    function onDragStart(e: DragStartEvent) {
        setActiveIndex(idToIndex(e.active.id as string));
    }

    function onDragEnd(e: DragEndEvent) {
        setActiveIndex(null);
        e.over && interactions.moveElement(idToIndex(e.active.id as string), idToIndex(e.over.id as string));
    }

    function getLogicBoxLeafProps(index: number[]): PassingLogicBoxProps<K, E, P> & { options: LogicBoxOptions } {
        const parent = index.length === 0 ? logicBox : goToLeaf(logicBox, elementsKey, index.slice(0, -1));
        const current = index.length === 0 ? logicBox : goToLeaf(logicBox, elementsKey, index);
        return {parent, current, elementsKey, index, options};
    }

    return (
        <DndContext collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className={'logic-box' + (className ? ` ${className}` : '')}>
                <LogicBoxLeaf interactions={interactions} LeafComponent={LeafComponent} TreeComponent={TreeComponent}
                              {...getLogicBoxLeafProps([])}/>

                <DragOverlay>
                    {activeIndex !== null &&
                        <LogicBoxLeafPlaceholder LeafPlaceholderComponent={LeafPlaceholderComponent}
                                                 TreePlaceholderComponent={TreePlaceholderComponent}
                                                 {...getLogicBoxLeafProps(activeIndex)}/>}
                </DragOverlay>
            </div>
        </DndContext>
    );
}

export default memo(LogicBox) as typeof LogicBox;
