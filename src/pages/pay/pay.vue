<template>
	<div class="pay">
    <VueHeader title="确认订单"></VueHeader>
		<div class="pay-cont">
			<van-cell-group>
        <!-- 联系人卡片 -->
        <van-contact-card
          :type="cardType"
          :name="currentContact.name"
          :tel="currentContact.tel"
          @click="showList = true"
        />
			
        <!-- 联系人列表 -->
        <van-popup v-model="showList" position="bottom">
          <van-address-list
            v-model="chosenContactId"
            :list="list"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
          />
        </van-popup>
			
        <!-- 联系人编辑 -->
        <van-popup v-model="showEdit" position="bottom">
          <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :address-info="editingContact"
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
          />
			  </van-popup>
		</van-cell-group>

		<van-cell-group>
			<van-card
			  :title="item.name"
			  :desc="item.desc"
			  :num="item.count"
			  :price="item.price"
			  :thumb="item.smpic" v-for="item in goods"
			  :key="this"
			/>
		</van-cell-group>
		
		<van-cell-group>
		  <van-cell title="支付方式" is-link :value="payResult[0]" @click="showType = true"/>
		  <!-- 支付方式 -->
			<van-popup v-model="showType" position="right"  class="showType">
        <van-nav-bar
          title="支付方式"
          left-text="返回"
          left-arrow
          @click-left="showType = false"
        />
        <h1 class="title">网上方式</h1>
        <van-checkbox-group v-model="payResult">
				  <van-checkbox
				    v-for="(item, index) in payList"
				    :key="item"
				    :name="item"
				  >
				     {{ item }}
				  </van-checkbox>
			  </van-checkbox-group>
			</van-popup>
		</van-cell-group>
		
		<van-cell-group>
		  <van-cell title="商品金额" :value="'¥ '+(totalPrice/100).toFixed(2)" />
		  <van-cell title="总运费" value="¥ 0" />
		</van-cell-group>
	  </div>
	  <van-submit-bar
		  :price="totalPrice"
		  button-text="提交订单"
		  @submit="onSubmit"
		/>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import { Toast, Dialog, AddressEdit } from 'vant'
  import area from '../../assets/js/area.js'
  import VueHeader from '@/components/vue-header.vue'
  
export default {
  data() {
    return {
      areaList: area,
      chosenContactId: null,
      editingContact: {},
      searchResult: [],
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [],
      showType:false,
      payList: ['支付宝', '微信', '中国建设银行'],
      payResult: ['支付宝'],
      goods:[]
    };
  },
  components: {
    VueHeader
  },
  created(){
    this.goods = this.$route.params.list
  },
  computed: {
    cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },
    currentContact() {
      const id = this.chosenContactId;
      console.log(this.chosenContactId);
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    },
    totalPrice() {
      let sumResult=0
      this.goods.forEach((item, index) => {
        sumResult += item.price * item.count * 100
      });
      return sumResult
    },
    ...mapState({
      selectGoods: state => state.selectGoods//绑定store.selectGoods到组件，之后可用this.selectGoods获取
    })
  },
  methods: {
    // 添加联系人
    onAdd() {
      // this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;      
      this.showEdit = true;
      this.editingContact = item ;
    },

    // 选中联系人
    onSelect() {
      this.showList = false;
    },

    // 保存联系人
    onSave(info) {
      console.log(info);
      this.showEdit = false;
      this.showList = false;
      info.address = `${info.province}${info.city}${info.county} ${info.address_detail}`

      if (this.isEdit) {
        this.list = this.list.map(item => item.id === info.id ? info : item);
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },
    //提交订单
    onSubmit(){
    	let that=this
    	if(this.chosenContactId == null){
    		Toast('请添加收货地址');
    	}else{
    		Dialog.confirm({
          title: '确认支付',
          message: '是否支付¥'+that.totalPrice
        }).then(() => {

          Toast.loading({
            mask: true,
            message: '支付中...'
          });
          setTimeout(function(){
             that.$router.push({path: '/paysuc'});
          },2000)

          that.goods.forEach((item, index) => {
  //			    	that.selectGoods.splice(index, 1);
            that.$store.dispatch('removeGoods',index)
            console.log('删除了'+that.goods[index].kid)
          });
			  })
    	}
    }
  },
  watch:{
  	payResult(e,old){
//		let index = this.payResult.indexOf(old);
//		if (index != -1) {
//			this.payResult.splice(index, 1);
//		}
        //如果存在两个值，就把old的值去掉，保留最新的值
		if(this.payResult.length>1){
			this.payResult.splice(0,1);
		}       
  		this.showType=false
  	}
  }
};
</script>

<style lang="less" scoped>

	
</style>
