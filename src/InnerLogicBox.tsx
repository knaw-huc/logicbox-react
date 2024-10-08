import React, {memo} from 'react';
import {SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {useDroppable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import Header from './Header';
import LogicBoxLeaf from './LogicBoxLeaf';
import {CollapsedStateLogicBoxProps, PassingCurrentLogicBoxProps, OptionsLogicBoxProps} from './misc';

type InnerLogicBoxProps<K extends string, E extends object, P extends {}> =
    OptionsLogicBoxProps<K, E, P> & PassingCurrentLogicBoxProps<K, E, P> & CollapsedStateLogicBoxProps;

function InnerLogicBox<K extends string, E extends object, P extends {}>(
    {
        options,
        interactions,
        LeafComponent,
        TreeComponent,
        parent,
        current,
        elementsKey,
        index,
        isCollapsed,
        setCollapsed,
    }: InnerLogicBoxProps<K, E, P>) {
    const id = index.join('-');
    const childIds = [...current[elementsKey].keys()].map(idx => [...index, idx].join('-'));

    const droppable = useDroppable({id});
    const sortable = index.length > 0 ? useSortable({id}) : undefined;

    const className = index.length > 0
        ? ('child' + (droppable?.isOver ? ' is-dragging-over' : '') + (sortable?.transform ? ' is-dragging' : ''))
        : undefined;
    const style = {
        transform: CSS.Translate.toString(sortable?.transform || null),
        transition: sortable?.transition
    };

    return (
        <div className={className} style={style} ref={sortable?.setNodeRef} {...sortable?.attributes}>
            <Header options={options}
                    interactions={interactions}
                    dragHandleProps={sortable?.listeners}
                    TreeComponent={TreeComponent}
                    parent={parent}
                    current={current}
                    elementsKey={elementsKey}
                    index={index}
                    isCollapsed={isCollapsed}
                    setCollapsed={setCollapsed}/>

            <div ref={droppable?.setNodeRef}>
                <SortableContext items={childIds} strategy={verticalListSortingStrategy}>
                    {!isCollapsed && current[elementsKey].map((elem, idx) => <LogicBoxLeaf
                        key={idx}
                        options={options}
                        interactions={interactions}
                        LeafComponent={LeafComponent}
                        TreeComponent={TreeComponent}
                        parent={current}
                        current={elem}
                        elementsKey={elementsKey}
                        index={[...index, idx]}/>)}
                </SortableContext>
            </div>
        </div>
    );
}

export default memo(InnerLogicBox) as typeof InnerLogicBox;
