import React, {memo} from 'react';
import {CollapsedStateLogicBoxProps} from './misc';

type ButtonGroupProps = {
    addElement?: () => void,
    removeElement?: () => void,
    dragHandleProps?: Record<string, Function>
} & CollapsedStateLogicBoxProps;

function ButtonGroup(
    {
        dragHandleProps,
        addElement,
        removeElement,
        isCollapsed,
        setCollapsed,
    }: ButtonGroupProps) {
    return (
        <div className="btn-group">
            {/* TODO: enable drag-and-drop support */}
            {false && dragHandleProps && <div className="btn move" title="Move" {...dragHandleProps}>
                &#10021;
            </div>}

            <div className="btn collapse" title={isCollapsed ? 'Expand' : 'Collapse'}
                 onClick={_ => setCollapsed(!isCollapsed)}>
                <CollapsedIcon isCollapsed={isCollapsed}/>
            </div>

            {removeElement && <div className="btn remove" onClick={_ => removeElement()}>
                <DeleteIcon/>
            </div>}

            {addElement && <div className="btn add" onClick={_ => addElement()}>
                +
            </div>}
        </div>
    );
}

function CollapsedIcon({isCollapsed = false}: { isCollapsed?: boolean }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="20">
            {isCollapsed &&
                <path fillRule="evenodd" clipRule="evenodd" fill="black"
                      d="M12 4L17.2711 9.27333L16.2102 10.3338L12 6.12178L7.7899 10.3338L6.729 9.27333L12 4ZM12 17.8782L7.7899 13.6662L6.729 14.7267L12 20L17.2711 14.7267L16.2102 13.6662L12 17.8782Z"/>}

            {!isCollapsed && <>
                <path fill="black"
                      d="M7.56994 5.00001L6.50928 6.06067L11.9999 11.5536L17.4906 6.06067L16.43 5.00001L11.9999 9.43186L7.56994 5.00001Z"/>
                <path fill="black"
                      d="M16.4298 19L17.4905 17.9394L11.9999 12.4465L6.5094 17.9394L7.57006 19L11.9999 14.5683L16.4298 19Z"/>
            </>}
        </svg>
    );
}

function DeleteIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -150 1324 1324" strokeWidth="20"
             fill="black" stroke="black">
            <path fill="#000000"
                  d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"/>
        </svg>
    );
}

export default memo(ButtonGroup);
