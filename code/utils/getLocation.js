function getLocation(value){
//     // value="S2"/>雁南S2</
// value="S3"/>雁南S3</
// value="S4"/>雁南S4</
// value="S5"/>雁南S5</
// value="S6"/>雁南S6</
// value="NA"/>雁北A</l
// value="NB"/>雁北B</l
// value="NC"/>雁北C</l
// value="ND1"/>雁北D1<
// value="ND2"/>雁北D2<
// value="NE"/>雁北E</l
    if(value){
        if(value=='S2'){
            value='雁南S2'
        }
        else if(value=='S3'){
            value='雁南S3'
        }
        else if(value=='S4'){
            value='雁南S4'
        }
        else if(value=='S5'){
            value='雁南S5'
        }
        else if(value=='S6'){
            value='雁南S6'
        }
        else if(value=='NA'){
            value='雁北A'
        }
        else if(value=='NB'){
            value='雁北B'
        }
        else if(value=='NC'){
            value='雁北C'
        }
        else if(value=='ND1'){
            value='雁北ND1'
        }
        else if(value=='ND2'){
            value='雁北ND2'
        }
        else if(value=='NE'){
            value='雁北E'
        }
    }
    return value
}
module.exports={getLocation}
