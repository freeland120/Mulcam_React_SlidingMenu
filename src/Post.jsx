import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Post extends Component {
  state = {
    posts: []
  };

  uploadPost = async () => {
    const send_param = {
      headers,
      id: $.cookie("login_id"),
      content: this.postE.value,
      img: ""
    };
    try {
      await axios.post("http://localhost:8080/post/upload", send_param);
      const result = await axios.post("http://localhost:8080/post/getAllPosts");

      if (result.data.posts) {
        this.setState({
          posts: result.data.posts
        });
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const postStyle = {
      width: 400,
      height: 100,
      borderStyle: "solid",
      margin: 5,
      borderColor: "blue"
    };

    let posts = this.state.posts.map(post => {
      let nick = post.user.nick;
      let follow = <button>팔로우하기</button>;
      if ($.cookie("login_nick") == post.user.nick) {
        nick = "";
        follow = "";
      }
      return (
        <div key={post.id} style={postStyle}>
          {nick}
          {follow}
          <br />
          {post.content}
        </div>
      );
    });

    return (
      <div>
        <h2>SNS Post</h2>
        <div>
          <textarea
            ref={ref => (this.postE = ref)}
            rows="5"
            cols="50"
          ></textarea>
          <br />
          <button>사진 업로드</button>
          <button onClick={this.uploadPost}>짹짹</button>
        </div>
        <div>{posts}</div>
      </div>
    );
  }
}

export default Post;
