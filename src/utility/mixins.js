export default {
    data() {
        return {
            defaultImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        }
    } ,
    methods:{
        goTo(name, params = {}){
            this.$router.push({
                name: name,
                params: params
            })
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 43 && charCode !== 44 && charCode !== 45 && charCode !== 46) {
              evt.preventDefault();;
            } else {
              return true;
            }
          }
    }
	}