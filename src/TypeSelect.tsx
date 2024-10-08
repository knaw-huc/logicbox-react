import React, {memo} from 'react';
import {LogicBoxOptions} from './misc';

function TypeSelect({type, changeType, options, isReadOnly}: {
    type: string;
    changeType: (newType: string) => void;
    options: LogicBoxOptions;
    isReadOnly: boolean;
}) {
    const optionGroups = Object.values(options).reduce<string[]>((acc, cur) => {
        if (cur.group && !acc.includes(cur.group))
            acc.push(cur.group);
        return acc;
    }, []);

    return (
        <select value={type} disabled={isReadOnly} onChange={e => changeType(e.target.value)}>
            {Object.entries(options).map(([key, option]) =>
                !option.group && <option key={key} value={key}>{option.label}</option>
            )}

            {optionGroups.map(group => <optgroup key={group} label={group}>
                {Object.entries(options).map(([key, option]) =>
                    option.group === group && <option key={key} value={key}>{option.label}</option>
                )}
            </optgroup>)}
        </select>
    );
}

export default memo(TypeSelect);
