/* 插值表达式 */
new Vue({
	el: '#stu1',
	data: {
		name: "cx",
		age: 18
	},
	methods: {
		say: function() {
			return this.name + "买了吉利！"
		}
	}
});

