import React, { ReactElement } from 'react'

interface Props {
    bon?:any
}

function Item({bon}: Props): ReactElement {
    return (
        <div style={{
            width:650,
            height: 58,
            backgroundColor:"#FDFDFD",
            border:"1px solid #EFE9E9",
            borderTopRightRadius:18,
            borderBottomRightRadius:18
        }}>
            
        </div>
    )
}
const styles = {

}
export { Item };