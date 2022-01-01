import { AutoComplete } from 'antd';
import React, { ChangeEventHandler, ReactElement, useEffect } from 'react'
import { InputProps } from 'react-select'
import styled from 'styled-components';
import { autocomplete, makeid } from '../tools';

interface Props {
    x: number,
    y: number,
    width: number,
    height: number,
    // suggestions:
    onchange: any
    value: string,
    typeText: typeText,
    maxchars?: number,
    placeholder: string,
    suggestions?: string[],
    options: { value: string }[]
    // classForAuto?:string
}
enum typeText {
    normal = "v-normal-text",
    small = "v-small-text",
}
function TextInput({ x, y, options, placeholder, suggestions = [], width, maxchars, height, value, typeText, onchange, ...rest }: Props): ReactElement {
    const uniqueId = makeid(8);
    useEffect(() => {
        const isAuto = suggestions.length > 0;
        if (isAuto) {
            autocomplete(uniqueId, suggestions);
        }
    }, [suggestions])
    return (
        <foreignObject x={x} y={y} width={width} height={height}>
            <StyledAutoComplete
                options={options}
                filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onClick={inputValue => {
                    //    console.log(e.currentTarget);
                    inputValue.currentTarget.nodeValue = ""
                }}
                placeholder={placeholder} value={value} maxTagTextLength={maxchars || 15}
                className={`v-text-input ${typeText} ${uniqueId}`} {...rest} onChange={onchange} />
        </foreignObject>
    )
}
const StyledAutoComplete = styled(AutoComplete)`
      .ant-select-selector{
          border:unset !important;
          box-shadow: unset !important;
          background: transparent !important;
          height: 20px !important;
      }
`;
export { TextInput, typeText }