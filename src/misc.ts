import {FunctionComponent, ReactElement} from 'react';
import {Interactions} from './Interactions';

export const isLogicBox = <K extends string, E extends object, P extends {}>(logicBox: LogicBox<K, E, P> | E, elementsKey: K): logicBox is LogicBox<K, E, P> =>
    elementsKey in logicBox;

export const goToLeaf = <K extends string, E extends object, P extends {}>(logicBox: LogicBox<K, E, P>, elementsKey: K, indexPath: number[]) =>
    indexPath.reduce((leaf, index) => leaf[elementsKey][index] as LogicBox<K, E, P>, logicBox);

export type LogicBox<K extends string, E extends object, P extends {} = {}> = {
    type: string;
} & P & {
    [name in K]: (LogicBox<K, E, P> | E)[];
};

export interface LeafPlaceholderComponentProps<K extends string, E extends object, P extends {}> {
    index: number[];
    element: E;
    parent: LogicBox<K, E, P>;
}

export interface LeafComponentProps<K extends string, E extends object, P extends {}> extends LeafPlaceholderComponentProps<K, E, P> {
    isCollapsed: boolean;
    canUpdateElement: boolean;
    onUpdateElement: (updateFn: (newElement: E, prevElement: E) => void) => void;
}

export interface TreePlaceholderComponentProps<K extends string, E extends object, P extends {}> {
    logicBox: LogicBox<K, E, P>;
    elementsKey: K;
    index: number[];
}

export interface TreeComponentProps<K extends string, E extends object, P extends {}> extends TreePlaceholderComponentProps<K, E, P> {
    isCollapsed: boolean;
    showOptions: boolean;
    selectBox: ReactElement;
    onChangeOptions: (newType: string) => void;
    onUpdate: (updateFn: (newLogicBox: LogicBox<K, E, P>, prevLogicBox: LogicBox<K, E, P>) => void) => void;
}

export type PassingLogicBoxProps<K extends string, E extends object, P extends {}, C = LogicBox<K, E, P> | E> = {
    parent: LogicBox<K, E, P>;
    current: C;
    elementsKey: K;
    index: number[];
};

export type PassingCurrentLogicBoxProps<K extends string, E extends object, P extends {}> =
    PassingLogicBoxProps<K, E, P, LogicBox<K, E, P>>;

export interface CollapsedStateLogicBoxProps {
    isCollapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export interface OptionsLogicBoxProps<K extends string, E extends object, P extends {}> {
    options: LogicBoxOptions;
    interactions: Interactions<E>;
    LeafComponent: FunctionComponent<LeafComponentProps<K, E, P>>;
    TreeComponent?: FunctionComponent<TreeComponentProps<K, E, P>>;
}

export interface PlaceholderLogicBoxProps<K extends string, E extends object, P extends {}> {
    options: LogicBoxOptions;
    LeafPlaceholderComponent?: FunctionComponent<LeafPlaceholderComponentProps<K, E, P>>;
    TreePlaceholderComponent?: FunctionComponent<TreePlaceholderComponentProps<K, E, P>>;
}

export interface LogicBoxOptions {
    [type: string]: {
        label: string;
        shortLabel: string;
        description?: string;
        group?: string;
    }
}
