import React, {useState, memo} from 'react';
import Leaf from './Leaf';
import InnerLogicBox from './InnerLogicBox';
import {isLogicBox, PassingLogicBoxProps, OptionsLogicBoxProps} from './misc';

type LogicBoxLeafProps<K extends string, E extends object, P extends {}> =
    OptionsLogicBoxProps<K, E, P> & PassingLogicBoxProps<K, E, P>;

function LogicBoxLeaf<K extends string, E extends object, P extends {}>(
    {
        options,
        interactions,
        LeafComponent,
        TreeComponent,
        parent,
        current,
        elementsKey,
        index,
    }: LogicBoxLeafProps<K, E, P>) {
    const [isCollapsed, setCollapsed] = useState(false);

    if (!isLogicBox(current, elementsKey))
        return <Leaf
            element={current}
            parent={parent}
            LeafComponent={LeafComponent}
            interactions={interactions}
            index={index}
            isCollapsed={isCollapsed}
            setCollapsed={setCollapsed}/>

    return <InnerLogicBox
        options={options}
        interactions={interactions}
        LeafComponent={LeafComponent}
        TreeComponent={TreeComponent}
        parent={parent}
        current={current}
        elementsKey={elementsKey}
        index={index}
        isCollapsed={isCollapsed}
        setCollapsed={setCollapsed}/>;
}

export default memo(LogicBoxLeaf) as typeof LogicBoxLeaf;
