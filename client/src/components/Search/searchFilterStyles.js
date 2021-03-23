export const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

export const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const dot = (data, isFocused) => ({
  display: 'inline-block',
  ':after': {
    // content: `'${data.value}'`,
    display: 'inline-block',
    marginRight: 50,
    float: 'left'
  },
  ':before': {
    backgroundColor: isFocused ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,.25)',
    borderRadius: 5,
    // content: `'${data.lastKnownLocation}'`,
    display: 'inline-block',
    marginLeft: 5,
    float: 'right',
    padding: '2px 5px 2px 5px'
  }
});

export const colourStyles = {
  control: styles => ( {
    ... styles,
    backgroundColor: 'rgba(79,99,103,.2)',
    fontSize: '12px', fontFamily: 'Avenir Next',
    borderRadius: '6px',
    border: 'none'
  }),
  placeholder: styles => ({
    ...styles,
    color: '#fff',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '0px 0px 0px 10px'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: 'white',
      fontWeight: '600',
      fontSize: '12px',
      fontFamily: 'Avenir Next',
      borderRadius: '6px',
      backgroundColor: isDisabled ? null : isSelected ? 'steelblue' : isFocused ? 'rgba(255,255,255,.5)' : null ,
      ...dot(data, isFocused)
    }
  },
  input: styles => ({
    color: 'white'
  }),
  singleValue : styles => ({
    color: 'white',
    textTransform: 'uppercase'
  }),
  menu: styles => ({
    ...styles,
    backgroundColor: 'rgba(0,0,0,.5)',
    backdropFilter: 'blur(2px)'
  })
};
