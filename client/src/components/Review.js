import React from 'react';
import "../scss/bootstrap.scss";
import "../scss/main.scss";

class Review extends React.Component {
	constructor(props) {
		super(props);
        let score = 0;
        let incorrect = [];
        this.props.questions.forEach(q => {
            if (this.props.answers[q.id][0]) {
                score++;
                incorrect.push(q.id);
            }
        })
        score = (score / this.props.questions.length * 100).toFixed()
        let message;
        if (score >= 90) {
            message = `Congratulations! You got ${score}% correct!`;
        } else if (score >= 75) {
            message = `You got ${score}% correct, that's okay, I guess?`;
        } else if (score >= 50) {
            message = `You only got ${score}% correct? Why don't you try harder next time.`;
        } else {
            message = `You should be really proud! You got ${score}%!`;
        }

        this.state = {
            incorrect_questions: incorrect,
            score_message: message
        };
	}

	render() {
		return (
			<div className="full">
				<div className="container py-5">
                    <div className="row pb-5">
                        <h1 className="text-center">{this.state.score_message}</h1>
                    </div>
                    {
                        this.props.questions.map(q => {
                            if (!this.state.incorrect_questions.includes(q.id)) {
                                return (
                                    <div className="pt-3">
                                        <h5>{q.question}</h5>
                                        <p className="text-danger">You incorrectly answered {this.props.guesses[q.id]}.</p>
                                        <p className="text-success">The correct answer was {this.props.answers[q.id][1]}.</p>
                                    </div>
                                )
                            }
                            return (
                                <div className="pt-3">
                                    <h5>{q.question}</h5>
                                    <p className="text-success">You correctly answered {this.props.guesses[q.id]}.</p>
                                </div>
                            )
                        })
                    }
                    <div className="center">
                        <button className="btn btn-outline-primary btn-lg text-center" onClick={() => window.location.reload()}>Try Again?</button>
                    </div>
                </div>
            </div>
		)
	}
}

export default Review;
