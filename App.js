import React, { Component } from 'react';
import { Picker, StyleSheet, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCountries: [],
      codeCountries: 'VN',
      dataCities: [],
      codeCities: '',
      dataCounties: [],
      codeCounties: '',
      dataWards: [],
      codeWards: ''
    };
  }
  
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/countries.json') //eslint-disable-line
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ dataCountries: Object.values(responseJson) });
    })
    .catch((error) => {
      console.error(error);
    });

    fetch('https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/tinh_tp.json') //eslint-disable-line
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ dataCities: Object.values(responseJson) });
    })
    .catch((error) => {
      console.error(error);
    });

    fetch('https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/quan_huyen.json') //eslint-disable-line
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ dataCounties: Object.values(responseJson) });
    })
    .catch((error) => {
      console.error(error);
    });

    fetch('https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/xa_phuong.json') //eslint-disable-line
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ dataWards: Object.values(responseJson) });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  renderlistCountries() {
    return (
      this.state.dataCountries.map((item, key) => (
        <Picker.item label={item.name} value={item.code} key={key} />
      ))
    );
  }
  
  renderlistCities() {
    if (this.state.codeCountries === 'VN') {
      return (this.state.dataCities.map((item, key) => (
      <Picker.item label={item.name} value={item.code} key={key} />
      )));
    }
      return (<Picker.item label={'Không có dữ liệu'} value={'noData'} />);
  }

  renderlistCounties() {
    if (this.state.codeCountries === 'VN') {
      const filteredDataCounties = this.state.dataCounties.filter((item) => {
        return (item.parent_code === this.state.codeCities);
      });
      return (filteredDataCounties.map((item, key) => (
        <Picker.item label={item.name} value={item.code} key={key} />
      )));
    }
      return (<Picker.item label={'Không có dữ liệu'} value={'noData'} />);
  }

  renderlistWards() {
    if (this.state.codeCountries === 'VN') {
      const filteredDataWards = this.state.dataWards.filter((item) => {
        return (item.parent_code === this.state.codeCounties);
      });
      return (filteredDataWards.map((item, key) => (
        <Picker.item label={item.name} value={item.code} key={key} />
      )));
    }
      return (<Picker.item label={'Không có dữ liệu'} value={'noData'} />);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Picker
            selectedValue={this.state.codeCountries}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ codeCountries: itemValue })}
          >
            {this.renderlistCountries()}
          </Picker>
          
          <Picker
            selectedValue={this.state.codeCities}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ codeCities: itemValue })}
          >
            {this.renderlistCities()}
          </Picker>
        </View>

        <View>
          <Picker
            selectedValue={this.state.codeCounties}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ codeCounties: itemValue })}
          >
            {this.renderlistCounties()}
          </Picker>

          <Picker
            selectedValue={this.state.codeWards}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ codeWards: itemValue })}
          >
            {this.renderlistWards()}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
