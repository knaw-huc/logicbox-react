import React, {FunctionComponent, memo} from 'react';
import TypeBox from './TypeBox';
import TypeSelect from './TypeSelect';
import ButtonGroup from './ButtonGroup';
import {Interactions} from './Interactions';
import {
    LogicBoxOptions,
    PassingCurrentLogicBoxProps,
    TreeComponentProps,
    CollapsedStateLogicBoxProps,
    LogicBox
} from './misc';

type HeaderProps<K extends string, E extends object, P extends {}> = {
    options: LogicBoxOptions;
    interactions: Interactions<E>;
    dragHandleProps?: Record<string, Function>;
    TreeComponent?: FunctionComponent<TreeComponentProps<K, E, P>>;
} & PassingCurrentLogicBoxProps<K, E, P> & CollapsedStateLogicBoxProps;

function Header<K extends string, E extends object, P extends {}>(
    {
        options,
        interactions: {
            isReadOnly, canRemoveElement, canAddElement, canUpdateElement,
            changeType, addElement, updateElement, removeElement
        },
        dragHandleProps,
        TreeComponent,
        current,
        elementsKey,
        index,
        isCollapsed,
        setCollapsed
    }: HeaderProps<K, E, P>) {
    const showOptions = Object.keys(options).length > 0 && current[elementsKey].length > 0;
    const selectBox = <TypeSelect type={current.type}
                                  changeType={newType => changeType(index, newType)}
                                  options={options}
                                  isReadOnly={isReadOnly}/>;

    function onUpdateLogicBox(updateFn: (newLogicBox: LogicBox<K, E, P>, prevLogicBox: LogicBox<K, E, P>) => void) {
        if (canUpdateElement(index)) {
            const newLogicBox = JSON.parse(JSON.stringify(current));
            updateFn(newLogicBox, current);
            updateElement(index, newLogicBox);
        }
    }

    return (
        <div className="header">
            <TypeBox type={current.type} options={options}/>

            <div className="header-menu">
                <ButtonGroup isCollapsed={isCollapsed}
                             setCollapsed={setCollapsed}
                             removeElement={canRemoveElement(index, true) ? () => removeElement(index) : undefined}
                             addElement={canAddElement(current[elementsKey].length) ? () => addElement(index) : undefined}
                             dragHandleProps={canUpdateElement(index) ? dragHandleProps : undefined}/>

                {TreeComponent && <TreeComponent
                    index={index}
                    isCollapsed={isCollapsed}
                    logicBox={current}
                    elementsKey={elementsKey}
                    showOptions={showOptions}
                    onChangeOptions={newType => changeType(index, newType)}
                    onUpdate={onUpdateLogicBox}
                    selectBox={selectBox}/>}

                {!TreeComponent && showOptions && selectBox}

                {!TreeComponent && !showOptions && 'No conditions'}
            </div>
        </div>
    );
}

export default memo(Header) as typeof Header;
