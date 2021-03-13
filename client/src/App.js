import React from 'react';
import axios from 'axios';
import Review from './components/Review';
import "./scss/bootstrap.scss";
import "./scss/main.scss";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			questions: [],
			answers: {},
			answerAlert: false,
			submitting: false
		}

		this.questionChange = this.questionChange.bind(this);
		this.submitAnswers = this.submitAnswers.bind(this);
	}

	questionChange(event) {
		let q = event.target.getAttribute("name");
		let a = event.target.value;
		let newAnswer = {...this.state.answers};
		newAnswer[q] = a;
		
		this.setState({answerAlert: false, answers: newAnswer});
	}

	submitAnswers(event) {
		event.preventDefault();
		
		if (Object.keys(this.state.answers).length !== this.state.questions.length) {
			this.setState({answerAlert: true});
		} else {
			this.setState({submitting: true})
			axios.post("/api/check/", {guesses: this.state.answers}).then(res => {
				console.log(res.data)
				this.setState({answerReceived: res.data})
			})
		}
	}

	componentDidMount() {
		axios.get("/api/questions/").then(res => {
			this.setState({questions: res.data})
		})
	}

	render() {
		if (this.state.answerReceived) {
			return (
				<Review answers={this.state.answerReceived} guesses={this.state.answers} questions={this.state.questions}/>
			)
		} else if (this.state.submitting) {
			return (
				<div className="full">
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
			)
		}
		return (
			<div className="full">
				<div className="container py-5">
					<div className="row justify-content-md-center">
						<div className="col-md-6">
							{
								(this.state.answerAlert) ?
								<div className="mb-5 alert alert-danger" role="alert">
									You have not answered all the questions!
								</div> :
								<div></div>
							}
						</div>
					</div>
					
					
					<form onSubmit={this.submitAnswers}>
						{
							this.state.questions.map((q, i) => {
								let question_text = q.question;
								let choices = q.choices;

								return (
									<div className="pb-5" onChange={this.questionChange}>
										<h5>{i + 1}) {question_text}</h5>
										{
											choices.map((c, c_idx) => {
												return (
													<div className="ms-3 form-check">
														<input className="form-check-input" name={i} id={i + "-" + c_idx} type="radio" value={c}></input>
														<label className="form-check-label" htmlFor={i + "-" + c_idx}>{c}</label>
													</div>
												)
											})
										}
									</div>
								)
							})
						}
						<div className="center">
							<button type="submit" className="btn btn-outline-primary text-center">Submit</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default App;
