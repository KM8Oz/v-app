import { addDays } from 'date-fns';
import React,{ useState } from 'react';
import { DateRangePicker, DateRangePickerProps } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
const DaterangePicker = ({ShowDatePicker,...props}:DateRangePickerProps&{ShowDatePicker:Boolean}) => {
    const style = useSpring({
        display: `${ ShowDatePicker ? "block" : "none" }`,
        transform: `scale(${ ShowDatePicker ? 1 : .9 })`,
        config: { mass: 8, tension: 1000, friction: 90 },
    })
    const [state, setState] = useState({
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        },
        compare: {
          startDate: new Date(),
          endDate: addDays(new Date(), 3),
          key: 'compare'
        }
      });
    return (
          <Container style={style}>
              <DateRangePicker
             {...props}
            className="undraggble"
            onChange={item => setState({ ...state, ...item })}
            months={1}
            minDate={addDays(new Date(), -300)}
            maxDate={addDays(new Date(), 900)}
            direction="vertical"
            scroll={{ enabled: true }}
            ranges={[state.selection, state.compare]}
          />
          </Container>
    );
};
const Container = styled(animated.div)`
    /* display: block; */
    /* transform: scale(1); */
    position: absolute;
    top: -12px;
    left: 153px;
    border-radius: 8px;
    overflow: hidden;
`;
export default DaterangePicker;