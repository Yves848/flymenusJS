import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

class Plats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      plats: []
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    this.props.firebase
      .plats(this.props.firebase.User.user.uid)
      .on("value", snapshot => {
        const platsObj = snapshot.val();
        console.log(platsObj);
        const platsList = Object.keys(platsObj).map(key => ({
          ...platsObj[key],
          uid: key
        }));
        this.setState({
          plats: platsList,
          loading: false
        });
      });
  }

  render() {
    const plats  = this.state.plats.map(plat => {
      console.log(plat);
      return <p key={plat.uid}>{plat.Nom} {plat.uid}</p>;
    });

    console.log(plats);
    return (
      <div>
        Plats
        {plats}
      </div>
    );
  }
}

export default withFirebase(Plats);
