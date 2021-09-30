const Result = (props) => {
    const finalinputs = props.valuelist.filter((e) => e !== '?')
    var total =0;
    var count = 0;
    finalinputs.forEach(element => {
        total+=parseInt(element);
        count++;
    });
    return (
      <div className="result">
          <p>The result is : {total/count}</p>
          <button onClick={props.goback}>go back</button>
      </div>
    );
  };
  
  export default Result;
  