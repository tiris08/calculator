document.addEventListener('DOMContentLoaded',() => {
   //maximo 15 digitos y 14 simbolos, 29 cARACTERES EN PANTALLA
   const uno      = document.querySelector('#uno');
   const dos      = document.querySelector('#dos');
   const tres     = document.querySelector('#tres');
   const cuatro   = document.querySelector('#cuatro');
   const cinco    = document.querySelector('#cinco');
   const seis     = document.querySelector('#seis');
   const siete    = document.querySelector('#siete');
   const ocho     = document.querySelector('#ocho');
   const nueve    = document.querySelector('#nueve');
   const cero     = document.querySelector('#cero');
   const decimal  = document.querySelector('#decimal');
   const negative = document.querySelector('#negative');
   const suma     = document.querySelector('#suma');
   const equal    = document.querySelector('#equal');
   const menos    = document.querySelector('#menos');
   const entre    = document.querySelector('#entre');
   const mult     = document.querySelector('#mult');
   const deleteB  = document.querySelector('#deleteB');
   const clir     = document.querySelector('#clir');
   const hist     = document.querySelector('#hist');
   const current  = document.querySelector('#current');
   const before   = document.querySelector('#before');
   let noDobleOperator = '';//to not repeat operaaor
   let integerPart = '';//for decimals
   let decimalPart = '';//as above
   let operator = '';//last operator used, in general
   let operatorLast = 0;// ro seaarch index on an operator and acomodate
   let lastNumber = '';//to acomodate
   let adjustment = '';//to use the operator and do adjisutment
   let numberS = '';//number on current
   let y = '';//hold numbers inputed briefly    
   let z = 0;//is the number to use to operate also shows on current
   let w = 0;//this one saves the results
   let punto = '';//for decimal control
   let equalWasPressed = '';// when you preseed equal to fix stuff
   let sumaResta = [];//holds all values to sum at the end

   let historial = 'Hist'//historial baby!
   let seen = ''//toggle the historial !!
   checkNumber();//check numbers also the .
   checkOperation();// check operations

   document.addEventListener('keydown',usingKeys);
   
   
   function usingKeys(k){
      if(k.key === '0'){
         addingNumber(0);
      }else if(k.key === '1'){
         addingNumber(1);
      }else if(k.key === '2'){
         addingNumber(2);
      }else if(k.key === '3'){
         addingNumber(3);
      }else if(k.key === '4'){
         addingNumber(4);
      }else if(k.key === '5'){
         addingNumber(5);
      }else if(k.key === '6'){
         addingNumber(6);
      }else if(k.key === '7'){
         addingNumber(7);
      }else if(k.key === '8'){
         addingNumber(8);
      }else if(k.key === '9'){
         addingNumber(9);
      }else if(k.key === 'Backspace'){
         addingNumber('delete');
      }else if(k.key === 'x'){
         if (noDobleOperator == ''){
            doOperation('mult');
            noDobleOperator = 'lol';
         }else{
            doOperation('');
         }
      }else if(k.key === '*'){
         if (noDobleOperator == ''){
            doOperation('mult');
            noDobleOperator = 'lol';
         }else{
            doOperation('');
         }
      }else if(k.key === '+'){
         if (noDobleOperator == ''){
            doOperation('suma');//the condition is to make sure no doble operator is use
            noDobleOperator = 'lol';
         }else{
            doOperation('');
         }
      }else if(k.key === '-'){
       
         if (noDobleOperator == ''){
            doOperation('menos');
            noDobleOperator = 'lol';
         }else{
            doOperation('');
         }
      }else if(k.key === '/'){
         if (noDobleOperator == ''){
            doOperation('entre');
            noDobleOperator = 'lol';
         }else{
            doOperation('');
         }
      }else if(k.key === '.'){
         if (punto ==''){//to control if a . was previusly used
            addingNumber('.');
            }else{
               addingNumber('');
            }
      }else if(k.key === 'C'){
         doOperation('clir');
      }else if(k.key === 'c'){
         doOperation('clir');
      }else if(k.key === '='){
         doOperation('equal');
      }else if(k.key === 'Enter'){
         doOperation('equal');
      }else if(k.key === 'H'){
         doOperation('hist');
      }else if(k.key === 'h'){
         doOperation('hist');
      }else if(k.key === 'N'){
         doOperation('negative');
  
      }else if(k.key === 'n'){
         doOperation('negative');
      }
      
      
   }
   function checkNumber(){
      uno.addEventListener('click',()=>{addingNumber(1);});
      dos.addEventListener('click',()=>{addingNumber(2);});
      tres.addEventListener('click',()=>{addingNumber(3);});
      cuatro.addEventListener('click',()=>{addingNumber(4);});
      cinco.addEventListener('click',()=>{addingNumber(5);});
      seis.addEventListener('click',()=>{addingNumber(6);});
      siete.addEventListener('click',()=>{addingNumber(7);});
      ocho.addEventListener('click',()=>{addingNumber(8);});
      nueve.addEventListener('click',()=>{addingNumber(9);});
      cero.addEventListener('click',()=>{addingNumber(0);});
      deleteB.addEventListener('click',()=>{addingNumber('delete');});
      decimal.addEventListener('click',()=>{
         if (punto ==''){//to control if a . was previusly used
            addingNumber('.');
            }else{
               addingNumber('');
            }
            });
   };
   
   function checkOperation(){
      suma.addEventListener('click',()=>{
         if (noDobleOperator == ''){
            doOperation('suma');//the condition is to make sure no doble operator is use
            noDobleOperator = 'lol';
         }else{
            doOperation('');
         }
         });
      menos.addEventListener('click',()=>{
         if (noDobleOperator == ''){
            doOperation('menos');
            noDobleOperator = 'lol';
         }else{
            doOperation('');
         }
         });
      entre.addEventListener('click',()=>{
         if (noDobleOperator == ''){
            doOperation('entre');
            noDobleOperator = 'lol';
         }else{
            doOperation('');
         }
         });
      mult.addEventListener('click',()=>{
         if (noDobleOperator == ''){
            doOperation('mult');
            noDobleOperator = 'lol';
         }else{
            doOperation('');
         }
         });
      equal.addEventListener('click',()=>{doOperation('equal');});
      negative.addEventListener('click',()=>{doOperation('negative');});
      clir.addEventListener('click',()=>{doOperation('clir');});
      hist.addEventListener('click',()=>{doOperation('hist');});
   };
   
   function doOperation(x){
      
      if(x =='clir'){
         w = 0;
         current.textContent ='0';
      }//to clear the inifinity loop
      if(w == Infinity || w == -Infinity){
         //this is the infinity LOCK DOWN!
         return;
      }
      if(current.textContent.length > 26){
         
         return;
          
      }
      if(x != 'negative' && x != 'hist' && x != 'equal'){
         equalWasPressed = ''//you only can input values  after equal operator is used
         
      }
      
      if(x == 'suma'){//to add
             
         acomodating(operator);//checks last operator amd do proper action to save value on w or to push on to array
         
         if (operator == 'x' || operator == '/' || operator == '(-)'|| operator == 'lol'){
            //in acomodating it only push when adding or substracting, therefore you need to push after acomdoating when other operator is used
            
            sumaResta.push(w);
         }else{// if not you just add
            z = addingNumber(x);
            //grabs the value of z tjat was on current, also clear y       
            w = z // makes them same value, all cool
         }
          
         if(numberS == '' && operator != '(-)'){
            
         numberS = z + '+';//to put on current when nothings was there
                   
         }else{
         numberS = current.textContent + '+';//if there was something, we saved that dude
         }
         current.textContent = numberS;//we placed the value on current
         
         operator = '+'; //we mark that we just used +
         
      }else if(x == 'menos'){
          
         acomodating(operator);
         //this one is analog to suma
        if (operator == 'x' || operator == '/' || operator == '(-)' || operator == 'lol'){
            sumaResta.push(w);
         }else{
         z = -1 * addingNumber(x);
         //just chaning the sign of z because the numebr is negative and to do a propper sum at the end
         
         w = z;
         }
         
         
        
         if(numberS == '' && operator != '(-)'){
            
         numberS = -1*z + '-';//analog to sua
    
            
         }else{
         numberS = current.textContent + '-';
         }
         current.textContent = numberS;
         operator = '-';
     
            
      }else if(x == 'entre'){
           //division and multiplciations are they own thing
         z = addingNumber(x);
         if (operator == '' || operator == '+' ){
            w = addingNumber(x);//you see we add the number to w this time only in this case
         }else if (operator == 'lol'){
            //if equal was pressed and then divide, you need to divide
            z = 1;
            acomodating('/');
         }else if (operator == 'x' || operator == '/'){
            
            acomodating(operator);//if division or multiplication was done before it will operate properly and save the value on w
         }else if (operator == '-'){
            w = addingNumber(x);//in the case of it being a minus before it has to multiply it by -1
            w = w*-1;
         }else if (operator == '(-)'){
            z = -1;
            acomodating(operator);
            //this only changes the value on the last one, almost the same as above
         }
         
            
            
         
          if(numberS == '' && operator != '(-)'){
            //to write on current similar as the ones above
            numberS = z + '/';
            
         }else{
            numberS = current.textContent + '/';
         }
         current.textContent = numberS;
         operator = '/';
   
      }else if(x == 'mult'){
         //multplication is basically the same as division  tbh they are the same operation 
         z = addingNumber(x);
            if (operator == '' || operator == '+' ){
            w = addingNumber(x);
         }else if(operator == 'lol'){
            z = 1;
            acomodating('x');
            //similar to divide but with multiplciation 
         
         }else if (operator == 'x' || operator == '/'){
            
            acomodating(operator);
         }else if (operator == '-'){
           w = addingNumber(x);
           w = w*-1;
         }else if (operator == '(-)'){
        
            z = -1;
            acomodating(operator);
          
         }
         
            
         if(numberS == '' && operator != '(-)'){
            
         numberS = z + 'x';
            
         }else{
         numberS = current.textContent + 'x';
         }
         current.textContent = numberS;
         operator = 'x';
         
          
      }else if(x == 'equal'){
         
        
         //this one checks the last operator on current to adjusts the total
         lastNumber = addingNumber(x);
      
         if(lastNumber == '' && operator != '(-)'){
            
            return;
            //i.e NaN
         }
         if(lastNumber ==''){
            
         }
            
         operatorLast = current.textContent.length - lastNumber.length - 1;
         adjustment = current.textContent.charAt(operatorLast);
         
         w = acomodating(adjustment);
     
         if(sumaResta.length == 0){
            w = w; //checking if only multiplcation and or division were done
         }else if(adjustment == '+' || adjustment == '-'){
            w = 0;//the other operators
         }else{
            
            
            sumaResta.push(w);
            w = 0;//when you add or substrac but also multiply and stuff
           
         }
          sumaResta.forEach((number)=>{
          w += number;
         });//we do the final math!
         
         sumaResta =[];
         
         historial = current.textContent;
         if(adjustment == ''){
            //nothing pressed
            w = z;
         }
         if (isNaN(w)){
            w = Infinity;
         }
         if(w == Infinity || w == -Infinity ){
           current.textContent ='Dude you can\'t divide by 0 lol';
           before.textContent = 'Click AC or press C to fix this!'; 
         }else{
            historial = current.textContent + '=';
            current.textContent = w;
            before.textContent = 'Hist';
            
         }
         numberS = current.textContent;
         
         operator = 'lol';//make operator an specially different value
         punto = '';
         //we clear some conditions
         //equal was pressed !!
         equalWasPressed = 'pressed';
         return;
      }else if(x == 'negative'){
         
       
         //is important to know what was the laast operator 
         operatorLast = current.textContent.length;
         adjustment = current.textContent.charAt(operatorLast-1);
      
         if(current.textContent =='0'){
            return;
         }
         if(adjustment == '+' || adjustment == '-' || adjustment == 'x' || adjustment == '/'){
            return;
         }
         
         
         if(equalWasPressed == 'pressed'){
            //well if it was pressed, the only thing on current is the result so
            if (w < 0){
            w = w*-1;
            current.textContent = w;
            numberS = current.textContent;
            
            }else {
            current.textContent = '(-)' + w;
            }
            z = w;
            w = -1*w;
            
            numberS = '';
           
            equalWasPressed = '';
         }else{
            //this is way more complicated than what I thought it would be, this add (-) to the left of the laast number previusly inputed, or deleting the symbol too!, this would make the number negative or positive
            
            lastNumber = z.toString();
       
            //is important to know what was the laast operator 
            operatorLast = current.textContent.length - lastNumber.length - 1;
            adjustment = current.textContent.charAt(operatorLast);
         
            let a = current.textContent.indexOf('+');//this looks
            let b = current.textContent.indexOf('-');//nd checks for
            let c = current.textContent.indexOf('x');// all poosiible
            let d = current.textContent.indexOf('/');//operators
            let e = current.textContent.indexOf(')');//their first appreance
            let al = current.textContent.lastIndexOf('+');//and also their last appearence
            let bl = current.textContent.lastIndexOf('-');
            let cl = current.textContent.lastIndexOf('x');
            let dl = current.textContent.lastIndexOf('/');
            let el = current.textContent.lastIndexOf(')');
         
            if (z < 0){
               z = z*-1;
            }
           
            if(e != -1 && el == e ){//first checks if there is a (-) or not
               if(e < al || e < bl || e < cl || e < dl){
                  current.textContent = numberS + '(-)' + z; 
               //(thereis none) at the end but atleast one before
               }else {
                  current.textContent = numberS + z;
               }//there is one and only one
            
            }else if (e == -1) {//there is nothing
               
               current.textContent = numberS + '(-)' + z;
               
            }else {
               if(el < al || el < bl || el < cl || el < dl){
               current.textContent = numberS + '(-)' + z; 
               //there is one with mroe than a sign before
            }else{
               current.textContent = numberS + z;
               //any other case
            }
            }
 
            if(adjustment == 'x' || adjustment == '/'){
          //improtant to check las perator to ajdust w
               if(operator =='(-)'){
                  w = w*-1;
                  return;
               }
                acomodating(adjustment);  
              
               w = w * -1;
            
            }else{
               if(adjustment ==')'){
                  w = -1 * w;//adjusting the value if there was (-) at the end
           
               }else if (adjustment ==''){
                  w = -1 *z;//other cases
            
               }else{
                
                  w = z;//other cases
               }
            }
            
            if(adjustment == '+'){
               w = w*-1;
               
            }
            
         operator = '(-)';
        //gives the las operator a name
      }else if(x == 'clir'){
         //the famous clear button
         noDobleOperator = '';
         integerPart = '';
         decimalPart = '';
         operator = '';
         operatorLast = 0;
         lastNumber = '';
         adjustment = '';
         numberS = '';
         y = '';
         z = 0;
         w = 0;
         punto = ''; 
         equalWasPressed = '';
         sumaResta = [];
  
         current.textContent = '0';
         before.textContent = 'Hist';
         historial = 'Hist';
      }else if (x =='hist'){
            //showing the historial or hist because that is cool
         if (seen ==''){
            before.textContent = historial;
            seen = 'seen';
         }else{
            before.textContent = 'Hist';
            seen = '';
         }
         
         return;
      }else if (x ==''){
         //do nothing lol
         return;
      }
      return;
   };
   
   
   function addingNumber (x){
      
      if(x == 'delete'){
         y = y.substring(0,y.length-1);
         
         x ='';//to delete stuff, all cool
      }else{
      
         if(current.textContent.length > 26){
            return;
         }
            
      }  
     
      if(w == Infinity || w == -Infinity){
         //The infinity LOCK DOWN
         return;
      }
      
      
      noDobleOperator = '';
      if (x == 'suma' || x == 'menos' || x == 'mult' || x == 'entre' || x == 'clir'){
         y = '';//to clear w and send the number z to make operations
      
      return z;
      }else if(x == 'equal'){
         lastNumber = y;
         //last number is important for some checkings
         y = '';      
         return lastNumber;
      
      }else if(x == 'fix'){//to fix some mistakes, always needed
      
         y = '';      
         return z;
      
         
      }else{
         if (x == '.'){//if . is preesed you create the integer part
            if (y ==''){
               y = '0';//important to have 0 to not creat a NaN
            }
               integerPart = y;
               y = y + x;//Gving the value to it and updating y
               punto = 'lol';//
         }else{
            if(integerPart == ''){
               y = y + x;//'.' had not beeing used, updating y
               
            }else{
               y = y + x;//finding were the decimal part is
               decimalPart = y.substr(y.indexOf('.'));
            }
         decimalPart = decimalPart.substr(1);////updating decimal part
            if (decimalPart == ''){
               z = parseInt(y);   //if there is no decimalpart this is z
            }else {
               z = parseInt(integerPart) + (parseInt(decimalPart)/(10**decimalPart.length));
            }//in the other case this is how it is fixed
         }   
      
      
      current.textContent = numberS + y;//updating screen
      if (current.textContent ==''){
         z = 0;
      }//to evade NaN
      };
      if(equalWasPressed == 'pressed')
      {
         z = 0;
         current.textContent = numberS;
         y = '';//when equal is pressed to acomodate stuff
      }
       
   }
  
   function acomodating(adjustment){//fixing stuff depending on last operator
         punto = '';
         z = addingNumber('fix');
         if(adjustment == '+'){
            sumaResta.push(z);
            w = z;
           return w;
          }else if(adjustment == '-'){
             z = z*-1;
             sumaResta.push(z);
            w = z;
            return w;
          }else if(adjustment == 'x'){
            
               w = w * z;
               return w;
          }else if(adjustment == '/'){
            w = w / z;
            return w;
          }else if(adjustment == '(-)'){
            return w;
          }else if(adjustment == ''){
            sumaResta.push(z);
            w = z
            return w;
          }else{
              
          return w;}
   };

});









