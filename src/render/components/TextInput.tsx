import { AutoComplete } from 'antd';
import { AutoCompleteProps } from 'antd/lib/auto-complete';
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
    options: any[]
    // classForAuto?:string
}
enum typeText {
    normal = "v-normal-text",
    small = "v-small-text",
}
function TextInput({ x, y, options, placeholder, suggestions = [], width, maxchars, height, value, typeText, onchange, ...rest }: Props & AutoCompleteProps): ReactElement {
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
                {...rest}
                options={options}
                filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().search(inputValue.toUpperCase()) !== -1
                }
                onClick={inputValue => {
                    //    console.log(e.currentTarget);
                    inputValue.currentTarget.nodeValue = ""
                }}
                placeholder={placeholder} value={value} maxTagTextLength={maxchars || 15}
                className={`v-text-input ${typeText} ${uniqueId}`} onChange={onchange} />
        </foreignObject>
    )
}
const StyledAutoComplete = styled(AutoComplete)`
      .ant-select-selector{
          border:unset !important;
          box-shadow: unset !important;
          background: transparent !important;
          height: 20px !important;
        .ant-select-selection-search-input {
            width: 100%;
            /* padding-left: 1em; */
            font-size: smaller;
            /* text-align: left; */
            text-align: center;
        }
      }
`;
export { TextInput, typeText }