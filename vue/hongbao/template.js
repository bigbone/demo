<section class="input_area">
        <div class="input_wrap_width100 clearfix">
                    <span class="input_left fl">红包金额</span><span class="input_right fr">元</span><input type="text" placeholder="输入金额" v-bind:class="'red_num_input '+payerrorclass" v-model="money" v-on:input="input" name="amount" maxlength="8">
                </div> 
                 
        <p class="money_tip">
            <span node-type="hongbao_create_random" v-if="isavg == 0">每人领到金额随机 0.01-200 元，<a href="javascript:void(0);"  v-on:click="isavg=1" class="tab">改为平均分</a></span>
           <span v-else-if="isavg === 1"node-type="hongbao_create_avg">每人领到金额相同，<a href="javascript:void(0);"  v-on:click="isavg=0" class="tab">改为随机分</a></span>
        </p>
        
        <div class="input_wrap_width100 clearfix">
                    <span class="input_left fl {{numerrorclass}}">红包个数</span><span class="input_right fr">个</span><input type="tel" placeholder="输入个数" v-bind:class="'red_num_input '+numerrorclass" maxlength="5" name="num" v-model="num" v-on:keyup="numinput">
        </div>


        <div v-if="tab == '1'">
                  <div class="input_wrap_width100 clearfix input_tabs_flex btn_list" node-type="hongbao_genders">
            <a href="javascript:;" v-bind:class="[index==1 ? 'btn_list_hov' : '']" node-type="hongbao_genter" v-on:click="selectchange" data-index=1 data-genter="f,m"  data-text="任何人可领">任何人可领<i></i></a>
            <a href="javascript:;" v-bind:class="[index==2 ? 'btn_list_hov' : '']" v-on:click="selectchange" data-genter="f" data-index=2 data-text="美女专享">美女专享<i></i></a>
            <a href="javascript:;" v-bind:class="[index==3 ? 'btn_list_hov' : '']" data-index=3 v-on:click="selectchange"  data-genter="m" data-text="帅哥专享">帅哥专享<i></i></a>
                  </div>
                </div>
                
                
                <div  v-else-if="tab === 2" >
                  <p class="money_tip fans_time">
                      <span>粉丝关注时间</span>
                   </p>
        
                  <div class="input_wrap_width100 clearfix input_tabs_flex btn_list input_warp_margin" node-type="hongbao_oldfans">
            <a href="javascript:;" node-type="hongbao_oldfan" v-bind:class="[index==1 ? 'btn_list_hov' : '']" data-oldfan="3" data-index=1 data-text="关注3天以上可领" v-on:click="selectchange">3天以上<i></i></a>
            <a href="javascript:;" v-bind:class="[index==2 ? 'btn_list_hov' : '']" v-on:click="selectchange" data-index=2 data-oldfan="30" data-text="关注1月以上可领">1月以上<i></i></a>
            <a href="javascript:;" data-index=3 v-bind:class="[index==3 ? 'btn_list_hov' : '']" v-on:click="selectchange" data-oldfan="365" data-text="关注1年以上可领">1年以上<i></i></a>
                  </div>
                </div>


                <div node-type="hongbao_code" v-else-if="tab === 3">
                  <div class="token_input_double">
                    <div class="input_wrap_width100 clearfix">
                        <span class="input_left fl">输入口令</span><input type="text" placeholder="请输入红包口令" v-model="code" v-on:input="codeinput" maxlength="10" class="red_num_input">
                    </div>
                    <div class="input_wrap_width100 clearfix">
                        <span class="input_left fl">口令提示</span><input type="text" placeholder="选填，如“我的名字是?”" maxlength="20" v-model="passtip" class="red_num_input">
                    </div>
                  </div>
                  <p class="red_set_warning" style="display:none;" node-type="hongbao_code_error">口令格式错误</p>
                </div>
                 
                <div class="money_big"><h2>¥ <span node-type="hongbao_create_numspan">{{money}}</span></h2></div>
                <a href="javascript:void(0)" v-bind:class="[!isactive ? 'HB_btn btn_1 btn_none' : 'HB_btn btn_1']" v-on:click="submit" action-data="uid=1866299417&amp;groupid=1000303&amp;eid=0">
                    <em>塞钱进红包</em>
                </a>
                  
      </section>