Vue.component('hongbao-select', {
  template: '#hongbao-template',
  replace: true,
  props :{
    'tab' : String,
    'index' :String,
    'oldfan' : String
  },
  data : function(){
    return {
      'tab': this.tab,
       'index' : this.index, 
      'genter' : 'f,m',
      'isavg':1,
      'oldfan' :'',
      'code':'' ,
      'passtip':'',
      'num':'',
      'money' :'',
      'isactive' : false,
      'payerrorclass' : '',
      'numerrorclass' :''
      }
  },
  watch :{
    tab :function(newvalue,oldvalue){
    }
  },
   
  'methods' :{
      'selectchange' : function(event){
        //this.index = index;
        var target = event.target;
        this.index = target.getAttribute('data-index');
        var genter = target.getAttribute('data-genter');
        this.genter = genter ||'';
        var oldfan = target.getAttribute('data-oldfan');
        this.oldfan = oldfan||'';

        if(this.tab ==1){
          this.$emit('tttt','{tab:"'+this.tab+'",genter:"'+this.genter+'"}');
        }else{
          this.$emit('tttt','{tab:"'+this.tab+'",oldfan:"'+this.oldfan+'"}');
        }
      },
      'input' : function(event){
          var target = event.target;
          var str = target.value;
          str = str.replace(/[^\d^\.]+/g, '').replace(/^00/g, '0.').replace(/[\.]+/g, '.').replace(/^[\.]+/, '');

         if (/^[\d]+\.[\d]*[\.]+/.test(str)) {
            str = str.substring(0, str.length - 1);
        }
        str = str.replace(/([0-9]+\.[0-9]{2})[0-9]*/, '$1');
        this.money = str;
        this.checkisok(); 
      },
      numinput: function(event){
         var target = event.target;
          var str = target.value;
          str = str.replace(/[^\d]+/g, '').replace(/^00/g, '').replace(/^[\.]+/, '');
          this.num = str;
          this.checkisok();
      },
      'codeinput' : function(){
          if(this.code){
             this.checkisok();
          }else{
            this.isactive = false;
          }
      },
      checkisok : function(isforce){
        var value = this.money;
        var num = this.num;
        if (value) {
            if (/^\d+(\.\d{1,2})?$/.test(value)) {
                if (value > 50000 || value <= 0) {
                    this.isactive = false;
                    if (isforce || (value != 0 && value != '0.')) {
                        console.log(value <= 0 ? '红包金额<br>不可小于0.01元' : '红包金额<br>不可超过50000元');
                        this.payerrorclass ="warning";
                    }
                } else {
                    this.payerrorclass ='';
                    if (!num) {
                        this.isactive = false;
                        this.numerrorclass = "warning";
                    } else {
                        if(value / num > 200){
                            console.log('红包金额不能超过200');
                            this.isactive = false;
                        }else if(value / num < 0.01){
                            console.log('红包金额不能小于0.01');
                            this.isactive = false;
                        }else{
                          if(this.tab ==3){
                              if(this.code){
                                this.isactive = true;
                              }else{
                                this.isactive = false;
                              }
                          }else{
                            this.isactive = true;
                          }
                        }
                        this.numerrorclass = "";
                        
                    }
                    return true;
                }
            } else {
                this.isactive = false;
                this.payerrorclass = "warning";
            }
        } else {
            this.payerrorclass = "warning";
            this.isactive = false;
        }
        return false;
  },
  'submit' : function(event){
    var target = event.currentTarget;
    var data = target.getAttribute('action-data');
    if(this.isactive){
      //console.log(target)
      //console.log(data);
      if(this.tab ==1){
        console.log({'genter':this.genter,'num':this.num,'money':this.money,'isavg':this.isavg});
      }else if(this.tab ==2){
        console.log({'oldfan':this.oldfan,'num':this.num,'money':this.money,'isavg':this.isavg});
      }else{
        console.log({'code':this.code,'num':this.num,'money':this.money,'passtip':this.passtip,'isavg':this.isavg});
      }
    }else{
      alert('得先填写信息');
    }
    //console.log(data);
    this.$emit('hongbao_submit',data);
  },
  'setChange' :function(index){
      this.tab =index;
      if(this.tab ==3){
        this.isactive = this.num && this.money && this.code;
      }else{
        this.isactive = this.num && this.money;
      }

  }
  }
});

  new Vue({
        el: '#hongbao',
        data: {
          'tab' : 1,
          'index' :1,
          'oldfan':'',
          'genter':''
        },
        computed: {
        },
        methods: {
          'tabs' : function(index){
            this.tab = index;
            this.index = 1;
            if(index== 1){
              !this.genter && (this.genter = 'f,m');
            }else if(index ==2){
              !this.oldfan && (this.oldfan = 3);
            }else if(index ==3){
              
            }
            this.$refs.child1.setChange(index);
          },
          submit:function(str){
            console.log(str);
          },
          settttt : function(str){
            console.log(str)
          }
        }
      })