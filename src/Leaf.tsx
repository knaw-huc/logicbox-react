import React, {FunctionComponent, memo} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import ButtonGroup from './ButtonGroup';
import {Interactions} from './Interactions';
import {LeafComponentProps, CollapsedStateLogicBoxProps, LogicBox} from './misc';

type LeafProps<K extends string, E extends object, P extends {}> = {
    element: E;
    parent: LogicBox<K, E, P>;
    LeafComponent: FunctionComponent<LeafComponentProps<K, E, P>>;
    interactions: Interactions<E>;
    index: number[];
} & CollapsedStateLogicBoxProps;

function Leaf<K extends string, E extends object, P extends {}>(
    {
        element,
        parent,
        LeafComponent,
        interactions: {canUpdateElement, canRemoveElement, canCreateLeaf, updateElement, removeElement, createLeaf},
        index,
        isCollapsed,
        setCollapsed,
    }: LeafProps<K, E, P>) {
    const sortable = useSortable({id: index.join('-')});

    function onUpdateElement(updateFn: (newElement: E, prevElement: E) => void) {
        if (canUpdateElement(index)) {
            const newElement = JSON.parse(JSON.stringify(element));
            updateFn(newElement, element);
            updateElement(index, newElement);
        }
    }

    const className = 'leaf' + (sortable?.transform ? ' is-dragging' : '');
    const style = {
        transform: CSS.Translate.toString(sortable?.transform || null),
        transition: sortable?.transition
    };

    return (
        <div className={className} style={style} ref={sortable?.setNodeRef} {...sortable?.attributes}>
            <ButtonGroup isCollapsed={isCollapsed}
                         setCollapsed={setCollapsed}
                         removeElement={canRemoveElement(index, false) ? () => removeElement(index) : undefined}
                         addElement={canCreateLeaf(index) ? () => createLeaf(index) : undefined}
                         dragHandleProps={canUpdateElement(index) ? sortable?.listeners : undefined}/>

            <LeafComponent isCollapsed={isCollapsed}
                           parent={parent}
                           index={index}
                           element={element}
                           canUpdateElement={canUpdateElement(index)}
                           onUpdateElement={onUpdateElement}/>
        </div>
    );
}

export default memo(Leaf) as typeof Leaf;
