import React from 'react';
import TypeBox from './TypeBox';
import {PassingCurrentLogicBoxProps, PlaceholderLogicBoxProps} from './misc';

type InnerLogicBoxPlaceholderProps<K extends string, E extends object, P extends {}> =
    PassingCurrentLogicBoxProps<K, E, P> & PlaceholderLogicBoxProps<K, E, P>;

export default function InnerLogicBoxPlaceholder<K extends string, E extends object, P extends {}>(
    {
        current,
        elementsKey,
        index,
        options,
        TreePlaceholderComponent
    }: InnerLogicBoxPlaceholderProps<K, E, P>) {
    return (
        <div className="child-placeholder">
            <TypeBox type={current.type} options={options}/>

            <div className="placeholder">
                {TreePlaceholderComponent &&
                    <TreePlaceholderComponent index={index} logicBox={current} elementsKey={elementsKey}/>}

                {!TreePlaceholderComponent && <span>
                    {current[elementsKey].length === 0 ? 'no' : current[elementsKey].length}
                    {current[elementsKey].length === 1 && elementsKey.endsWith('s') ? elementsKey.substring(0, -1) : elementsKey}
                </span>}
            </div>
        </div>
    );
}
