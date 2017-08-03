<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

        <Form-item label="标题" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
        </Form-item>

        <Form-item label="缩略图" prop="thumb">
            <Upload
                    :on-success="_imgUploadSuccess"
                    action="http://rap.taobao.org/mockjs/17725/api/image?accessToken=aaa"
            >
                <Button type="ghost" icon="ios-cloud-upload-outline">上传缩略图</Button>
            </Upload>
        </Form-item>

        <Form-item label="地区" prop="address">
            <Select v-model="formValidate.address" style="width:200px">
                <Option v-for="item in addressList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Form-item>


        <Form-item label="语言" prop="language">
            <Radio-group v-model="formValidate.language">
                <Radio label="Chinese">
                    <span>中文</span>
                </Radio>
                <Radio label="Japanese">
                    <span>日语</span>
                </Radio>
                <Radio label="English">
                    <span>英语</span>
                </Radio>
            </Radio-group>
        </Form-item>

        <Form-item label="是否新番" prop="is_new">
                <i-switch v-model="formValidate.is_new">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
        </Form-item>


            <Row v-if="this.formValidate.is_new" >
                <i-col span="11">
                    <Form-item prop="update_date" label="更新时间">
                        <Date-picker type="date" placeholder="选择日期" format="dd日" v-model="formValidate.update_date"></Date-picker>
                    </Form-item>
                </i-col>
            </Row>



        <Form-item label="声优" prop="akira">
            <Select v-model="formValidate.akira" filterable multiple size="large">
                <Option v-for="item in akiraList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </Form-item>

        <Form-item label="类型" prop="tag">
            <Select v-model="formValidate.tag" filterable multiple size="large">
                <Option v-for="item in tagList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </Form-item>



        <Row>
            <i-col span="11">
                <Form-item label="发行时间" prop="issue_date">
                    <Date-picker type="year" format="yyyy年MM月" placeholder="选择日期" v-model="formValidate.issue_date"></Date-picker>
                </Form-item>
            </i-col>
        </Row>



        <Form-item label="简介" prop="introduction">
            <Input v-model="formValidate.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入简介..."></Input>
        </Form-item>

        <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </Form-item>
    </Form>
</template>
<script>
  import ICol from "../../../node_modules/iview/src/components/grid/col";
  import {getAkiraList,getTagList} from 'api/video';
  import Mock from 'mockjs';
  import {ERR_OK} from 'api/config';

  export default {
    components: {ICol},
    data () {
      return {
        tagList: [],
        akiraList: [],
        addressList: [
          {
            value: 'Japan',
            label: '日漫'
          },
          {
            value: 'US',
            label: '美漫'
          },
          {
            value: 'China',
            label: '国漫'
          }
        ],
        formValidate: {
          title: '',
          thumb: '',
          address: 'Japan',
          language: 'Japanese',
          issue_date: '',
          update_date: '',
          akira: [],
          tag: [],
          is_new: false,
          introduction: ''
        },
        ruleValidate: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请选择地区', trigger: 'change' }
          ],
          thumb: [
            { required: true, message: '缩略图不能为空', trigger: 'change' }
          ],
          language: [
            { required: true, message: '请选择地区', trigger: 'change' }
          ],
          akira: [
            { required: true, type: 'array', min: 1, message: '至少选择一个声优', trigger: 'change' },
            { type: 'array', max: 4, message: '最多选择四个声优', trigger: 'change' }
          ],
          tag: [
            { required: true, type: 'array', min: 1, message: '至少选择一个类型', trigger: 'change' },
            { type: 'array', max: 4, message: '最多选择四个类型', trigger: 'change' }
          ],
          issue_date: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          update_date: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          introduction: [
            { required: true, message: '请输入作品简介', trigger: 'blur' },
            { type: 'string', min: 10, message: '介绍不能少于10字', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this._getAkiraList();
      this._getTagList();
    },
    methods: {
      _imgUploadSuccess(response, file, fileLis) {
            if (response.errno == ERR_OK) {
              console.log(Mock.mock(response.data.thumb));
              this.formValidate.thumb = Mock.mock(response.data.thumb);
            }else {
              this.$Message.error('未知错误!');
            }
      },
      _getAkiraList () {
        getAkiraList().then((res) => {
          if (res.errno == ERR_OK){
            this.akiraList= res.data
          }
        })
      },
      _getTagList () {
        getTagList().then((res) => {
          if (res.errno == ERR_OK){
            this.tagList= res.data
          }
        })
      },
      handleSubmit (name) {
        console.log(this.formValidate);
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
