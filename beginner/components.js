class StoryBox extends React.Component {
	render() {
		const now = new Date()
		const topicsList = ['HTML', 'JS', 'React'];
		return (
			<div>
				<h3>Soties App</h3>
				<p className="lead">
					Current Time: {now.toTimeString()}
				</p>
				<ul>
					{topicsList.map( topic => <li>{topic}</li>)}
				</ul>
			</div>
		);
	}
}
/*
let target = document.getElementById('story-app');

ReactDOM.render(
	<CommentBox />, target
);
*/

class Comment extends React.Component {
	_handleDelete(event) {
		event.preventDefault();
		if (confirm('you sure?')) {
			this.props.onDelete(this.props);
		}
	}

	render() {
		return (
		<div className="commnet">
			<p className="comment-header">{this.props.author}</p>
			<p className="comment-body">
				{this.props.body}
			</p>
			<div className="comment-footer">
				<a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>
					Delete comment
				</a>
			</div>
		</div>
		);
	}
}

class CommentBox extends React.Component {
	constructor() {
		super();

		this.state = {
			showComments: false,
			comments: []
		};
	}

	componentWillMount() {
		this._fetchComments();
	}

	componentDidMount() {
		this.timer = setInterval(()=>{
			this._fetchComments();
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	_getComments() {
		return this.state.comments.map((comment) => {
			return (
			<Comment 
				author={comment.author} 
				body={comment.body} 
				onDelete={this._deleteComment.bind(this)}
				key={comment.id} />
			);
		});
	}

	_getCommentsTitle(commentsCount) {
		switch(commentsCount){
			case 0:
				return 'No comments yet';
				break;
			case 1:
				return '1 comment';
				break;
			default:
				return `${commentsCount} comments`;
				break;
		}
	}

	_handleClick() {
		this.setState({showComments: !this.state.showComments});
	}

	_addComment(author, body) {
		const comment = {
			id: this.state.comments.length + 1,
			author,
			body
		};
		this.setState({
			comments: this.state.comments.concat([comment])
		});
	}

	// buscar react lifecycle methods
	// are functions that get called while component is rendered
	// for the first time or about to be removed from the DOM
	// http://busypeoples.github.io/post/react-component-lifecycle/
	// https://facebook.github.io/react/docs/react-component.html
	// Lo mismo para Control flows (one way control flow)
	_fetchComments() {
		console.log('Fetching');
		let defer = jQuery.Deferred();

		defer.done((comments) => {
			console.log('Fetch!');
			this.setState({comments});
		});

		setTimeout(()=>{
			let empty = (this.state.comments.length === 0);
			let dummy = [
				{id: 1, author: 'Ivan', body: 'I want to believe'},
				{id: 2, author: 'Carlos', body: 'I want NOT to believe'}
			];
			defer.resolve(!empty ? this.state.comments.concat([]) : dummy);
		}, 2000);


		/* jQuery.get( '/api/comments', (comments) => {
			console.log('Fetch!');
			this.setState({comments});
		}); */

	}

	_deleteComment(comment) {
		console.log('Deleting');
		let defer = jQuery.Deferred();

		defer.done((comments) => {
			console.log('Deleted!');
			this.setState({comments});
		});

		setTimeout(()=>{
			let comments = [...this.state.comments]; //copy existing comments
			let index = comments.indexOf(comment);
			comments.splice(index, 1);

			defer.resolve(comments);
		}, 800);
	}

	render() {
		const comments = this._getComments();
		const titleComments = this._getCommentsTitle(comments.length);
		let commentNodes;
		let buttonText = 'Show';

		if(this.state.showComments) {
			commentNodes = <div className="comment-list">{comments}</div>;
			buttonText = 'Hide';
		}
		return (
			<div className="commnet-box">
				<CommentForm addComment={this._addComment.bind(this)} />
				<h3>Comments</h3>
				<h4 className="comment-count">{titleComments}</h4>
				<button onClick={this._handleClick.bind(this)}>{buttonText} comments</button>

				{commentNodes}
			</div>
		);
	}
}

class CommentForm extends React.Component {
	// synthetic events!!!!! <-- cross browser wrapper
	//  around browser's native event system
	// ref allow reference DOM elements
	_handleSubmit(event) {
		event.preventDefault();
		let author = this._author;
		let body = this._body;

		// 2 way communication parent-child
		this.props.addComment(author.value, body.value);
		this._author.value = null;
		this._body.value = null;
	}

	render() {
		return (
			<form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
				<label>Join the  discussion</label>
				<div className="comment-form-fields">
					<input placeholder="Name:" ref={(input) => this._author = input} />
					<textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}>
					</textarea>
				</div>
				<div className="comment-form-actions">
					<button type="submit">Post comment</button>
				</div>
			</form>
		);
	}
}

let target = document.getElementById('story-app');

ReactDOM.render(
	<CommentBox />, target
);