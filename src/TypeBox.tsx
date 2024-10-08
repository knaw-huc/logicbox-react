import React, {memo} from 'react';
import {LogicBoxOptions} from './misc';

function TypeBox({type, options}: { type: string, options: LogicBoxOptions }) {
    return (
        <div className="type-box">
            <span>{options[type].shortLabel}</span>
        </div>
    );
}

export default memo(TypeBox);
