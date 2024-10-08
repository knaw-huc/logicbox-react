import React from 'react';
import LeafPlaceholder from './LeafPlaceholder';
import InnerLogicBoxPlaceholder from './InnerLogicBoxPlaceholder';
import {isLogicBox, PassingLogicBoxProps, PlaceholderLogicBoxProps} from './misc';

type LogicBoxLeafPlaceholderProps<K extends string, E extends object, P extends {}> =
    PassingLogicBoxProps<K, E, P> & PlaceholderLogicBoxProps<K, E, P>;

export default function LogicBoxLeafPlaceholder<K extends string, E extends object, P extends {}>(
    {
        parent,
        current,
        elementsKey,
        index,
        options,
        LeafPlaceholderComponent,
        TreePlaceholderComponent
    }: LogicBoxLeafPlaceholderProps<K, E, P>) {
    if (!isLogicBox(current, elementsKey))
        return <LeafPlaceholder element={current}
                                index={index}
                                parent={parent}
                                LeafPlaceholderComponent={LeafPlaceholderComponent}/>

    return <InnerLogicBoxPlaceholder parent={parent}
                                     current={current}
                                     elementsKey={elementsKey}
                                     index={index}
                                     options={options}
                                     LeafPlaceholderComponent={LeafPlaceholderComponent}
                                     TreePlaceholderComponent={TreePlaceholderComponent}/>
}
