import React, {FunctionComponent} from 'react';
import {LeafPlaceholderComponentProps, LogicBox} from './misc';

type LeafPlaceholderProps<K extends string, E extends object, P extends {}> = {
    element: E;
    index: number[];
    parent: LogicBox<K, E, P>;
    LeafPlaceholderComponent?: FunctionComponent<LeafPlaceholderComponentProps<K, E, P>>;
}

export default function LeafPlaceholder<K extends string, E extends object, P extends {}>(
    {
        element,
        index,
        parent,
        LeafPlaceholderComponent
    }: LeafPlaceholderProps<K, E, P>) {
    return (
        <div className="placeholder">
            {LeafPlaceholderComponent &&
                <LeafPlaceholderComponent index={index} element={element} parent={parent}/>}

            {!LeafPlaceholderComponent && <span>
                Move to the new desired place
            </span>}
        </div>
    );
}
