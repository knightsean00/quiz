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
			guesses: {},
			answerAlert: false,
			submitting: false
		};

		this.questionChange = this.questionChange.bind(this);
		this.submitGuess = this.submitGuess.bind(this);
	}

	componentDidMount() {
		axios.get("/api/questions/").then(res => {
			// questions will be in the form of {question: str, choices: list, id: int}
			this.setState({questions: res.data});	
		})
	}

	// Called whenever a radio button is pressed
	questionChange(event) {
		const q = event.target.getAttribute("name");
		const a = event.target.value;

		let newGuess = {...this.state.guesses};
		newGuess[q] = a;
		
		// Guess in the form of {question_id (int): guess (str)}
		this.setState({answerAlert: false, guesses: newGuess});
	}

	submitGuess(event) {
		event.preventDefault();
		
		if (Object.keys(this.state.guesses).length !== this.state.questions.length) {
			this.setState({answerAlert: true});
		} else {
			this.setState({submitting: true});
			axios.post("/api/check/", {guesses: this.state.guesses}).then(res => {
				// Received answers in the form of {question_id (int): [correct? (bool), actual_answer]}
				this.setState({answerReceived: res.data, submitting: false});
			}).catch(err => {
				console.log("Something went wrong.")
				console.log(err);
			})
		}
	}

	render() {
		if (this.state.answerReceived) {
			return (
				<Review answers={this.state.answerReceived} guesses={this.state.guesses} questions={this.state.questions}/>
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
					<form onSubmit={this.submitGuess}>
						{
							this.state.questions.map((q, question_number) => {
								let question_text = q.question;
								let choices = q.choices;
								let id = q.id;

								return (
									<div className="pb-5" onChange={this.questionChange}>
										<h5>{question_number + 1}) {question_text}</h5>
										{
											choices.map((c, c_idx) => {
												return (
													<div className="ms-3 form-check">
														<input className="form-check-input" name={id} id={question_number + "-" + c_idx} type="radio" value={c}></input>
														<label className="form-check-label" htmlFor={question_number + "-" + c_idx}>{c}</label>
													</div>
												)
											})
										}
									</div>
								)
							})
						}
						<div className="center">
							<button type="submit" className="btn btn-outline-primary btn-large text-center">Submit</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default App;
