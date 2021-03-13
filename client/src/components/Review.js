import React from 'react';
import "../scss/bootstrap.scss";
import "../scss/main.scss";



class Review extends React.Component {
	constructor(props) {
		super(props);
        let running_score = 0
        let incorrect = []
        console.log(this.props.answers)
        this.props.questions.forEach((q, i) => {
            if (this.props.answers[i][0]) {
                running_score++;
                incorrect.push(i)
            }
        })

        this.state = {
            score: (running_score / this.props.questions.length * 100).toFixed(),
            incorrect_questions: incorrect
        }
	}

	render() {
		return (
			<div className="full">
				<div className="container py-5">
                    <div className="row">
                        <h1 className="text-center">You got {this.state.score}% correct!</h1>
                    </div>
                    {
                        this.props.questions.map((q, i) => {
                            console.log(q)
                            if (!this.state.incorrect_questions.includes(i)) {
                                return (
                                    <div className="pt-3">
                                        <h5>{q.question}</h5>
                                        <p className="text-danger">You incorrectly answered {this.props.guesses[i]}</p>
                                        <p className="text-success">The correct answer was {this.props.answers[i][1]}</p>
                                    </div>
                                )
                            }
                            return (
                                <div className="pt-3">
                                    <h5>{q.question}</h5>
                                    <p className="text-success">You answered {this.props.guesses[i]}</p>
                                </div>
                            )
                        })
                    }
                    <div className="center">
                        <button className="btn btn-outline-primary text-center" onClick={() => window.location.reload()}>Try Again</button>
                    </div>
                </div>
            </div>
		)
	}
}

export default Review;
