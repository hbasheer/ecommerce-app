import React from 'react';
import { Text as TextRN } from 'react-native';

export default class Text extends React.Component  {
  render() {
    return (
      <TextRN style={[styles.font, this.props.style]} {...this.props}> 
        {this.props.children}
      </TextRN>
    )
  }
}
const styles = {
  font: {
  	textAlign: 'left',
  }
};