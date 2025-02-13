"use strict";(self["webpackChunkfrontend_ebox_platform"]=self["webpackChunkfrontend_ebox_platform"]||[]).push([[356],{1410:function(e,t,a){a.d(t,{GR:function(){return n},L0:function(){return i},a1:function(){return l},nL:function(){return s}});var r=a(1189);const o="http://147.182.161.84:9000/api/v1";function l(e){return r.A.get(`${o}/cisterns/all`,{headers:{Authorization:`Bearer ${e}`}})}function n(e,t){return r.A.post(`${o}/cisterns/add`,t,{headers:{Authorization:`Bearer ${e}`}})}function i(e,t){return r.A.delete(`${o}/cisterns/delete/${t}`,{headers:{Authorization:`Bearer ${e}`}})}function s(e,t,a){return console.log(a),r.A.put(`${o}/cisterns/update/${a}`,t,{headers:{Authorization:`Bearer ${e}`}})}},2356:function(e,t,a){a.r(t),a.d(t,{default:function(){return P}});var r=a(6768);const o=e=>((0,r.Qi)("data-v-8e9a4c34"),e=e(),(0,r.jt)(),e),l={class:"pt-0 mt-0 pb-10 ml-0 mr-0 min-w-max[100%]"},n={class:"flex justify-between items-center mb-2 bg-gray-50 p-6 rounded-lg shadow-lg"},i=o((()=>(0,r.Lk)("h1",{class:"font-bold lg:text-2xl text-xl text-indigo-900"},[(0,r.Lk)("span",{class:"mdi mdi-tanker-truck"}),(0,r.eW)(" Mantenimiento de Cisternas")],-1)));function s(e,t,a,o,s,c){const d=(0,r.g2)("DataTable"),u=(0,r.g2)("CreateCisternsForm");return(0,r.uX)(),(0,r.CE)("div",l,[(0,r.Lk)("div",null,[(0,r.Lk)("div",n,[i,(0,r.Lk)("button",{class:"flex items-center justify-center bg-[#ff8c54] text-white font-semibold px-5 py-2 rounded-lg hover:bg-orange-500 shadow-md",onClick:t[0]||(t[0]=(...e)=>o.openCreateForm&&o.openCreateForm(...e))}," Crear + ")]),(0,r.bF)(d),o.isCreateFormVisible?((0,r.uX)(),(0,r.Wv)(u,{key:0,onClose:o.closeCreateForm},null,8,["onClose"])):(0,r.Q3)("",!0)])])}var c=a(144),d=a(2729),u=a(6329),m=a(9669),p=a(5728);function f(e,t,a,o,l,n){const i=(0,r.g2)("EditCisternsForm"),s=(0,r.g2)("SuccessAlert"),c=(0,r.g2)("ErrorAlert"),f=(0,r.g2)("WarningAlert");return(0,r.uX)(),(0,r.CE)(r.FK,null,[(0,r.bF)(d.J,{flat:""},{default:(0,r.k6)((()=>[(0,r.bF)(p.W,{modelValue:o.search,"onUpdate:modelValue":t[0]||(t[0]=e=>o.search=e),label:"Buscar","prepend-inner-icon":"mdi-magnify",variant:"outlined","hide-details":"","single-line":"",density:"compact",class:"mb-2"},null,8,["modelValue"]),(0,r.bF)(u.Py,{headers:o.headers,items:o.filteredItems,search:o.search},{["item.actions"]:(0,r.k6)((({item:e})=>[(0,r.bF)(m.w,{small:"",class:"mr-2",onClick:t=>o.openEditForm(e)},{default:(0,r.k6)((()=>[(0,r.eW)(" mdi-pencil ")])),_:2},1032,["onClick"]),(0,r.bF)(m.w,{small:"",color:"red",onClick:t=>o.deleteItem(e)},{default:(0,r.k6)((()=>[(0,r.eW)(" mdi-delete ")])),_:2},1032,["onClick"])])),_:2},1032,["headers","items","search"]),o.isEditFormVisible?((0,r.uX)(),(0,r.Wv)(i,{key:0,cisterns:o.selectCisterns,onClose:o.closeEditForm},null,8,["cisterns","onClose"])):(0,r.Q3)("",!0)])),_:1}),(0,r.bF)(s),(0,r.bF)(c),(0,r.bF)(f)],64)}var b=a(1410),k=a(5129),C=a(6859),F=a(5130),v=a(2807),g=a(1606),h=a(697),y=a(3745),V=a(1772),A=a(1560);const _=e=>((0,r.Qi)("data-v-565f7d1f"),e=e(),(0,r.jt)(),e),x=_((()=>(0,r.Lk)("span",{class:"text-h5"},"Editar Cisterna",-1)));function W(e,t,a,o,l,n){return(0,r.uX)(),(0,r.Wv)(V.p,{modelValue:o.dialog,"onUpdate:modelValue":t[4]||(t[4]=e=>o.dialog=e),"max-width":"600px",persistent:""},{default:(0,r.k6)((()=>[(0,r.bF)(d.J,null,{default:(0,r.k6)((()=>[(0,r.bF)(g.r,{class:"text-center"},{default:(0,r.k6)((()=>[x])),_:1}),(0,r.bF)(h.O,null,{default:(0,r.k6)((()=>[(0,r.bF)(A.n,{onSubmit:(0,F.D$)(o.submitForm,["prevent"])},{default:(0,r.k6)((()=>[(0,r.bF)(p.W,{modelValue:o.form.code,"onUpdate:modelValue":t[0]||(t[0]=e=>o.form.code=e),label:"Código de cisterna","prepend-icon":"mdi mdi-shield-check",required:""},null,8,["modelValue"]),(0,r.bF)(p.W,{modelValue:o.form.plate,"onUpdate:modelValue":t[1]||(t[1]=e=>o.form.plate=e),label:"Placa","prepend-icon":"mdi-tanker-truck",required:""},null,8,["modelValue"]),(0,r.bF)(p.W,{modelValue:o.form.capacity,"onUpdate:modelValue":t[2]||(t[2]=e=>o.form.capacity=e),label:"Capacidad de Cisterna","prepend-icon":"mdi mdi-battery-80",required:""},null,8,["modelValue"]),(0,r.bF)(p.W,{modelValue:o.form.documentSeries,"onUpdate:modelValue":t[3]||(t[3]=e=>o.form.documentSeries=e),label:"Documento asignado","prepend-icon":"mdi-card",required:""},null,8,["modelValue"]),(0,r.bF)(y.S,{class:"justify-end"},{default:(0,r.k6)((()=>[(0,r.bF)(v.D,{text:"",onClick:o.closeDialog,color:"#180c24"},{default:(0,r.k6)((()=>[(0,r.eW)("Cancelar")])),_:1},8,["onClick"]),(0,r.bF)(v.D,{type:"submit",color:"#ff8c54"},{default:(0,r.k6)((()=>[(0,r.eW)("Guardar")])),_:1})])),_:1})])),_:1},8,["onSubmit"])])),_:1})])),_:1})])),_:1},8,["modelValue"])}var S={props:{cisterns:{type:Object,required:!0}},emits:["close"],setup(e,{emit:t}){const a=(0,c.KR)(!0),o=(0,c.KR)({code:"",capacity:"",plate:"",documentSeries:""});(0,r.wB)((()=>e.cisterns),(e=>{e&&(o.value={...e})}),{immediate:!0});const l=()=>{t("close")},n=async()=>{try{const e={code:o.value.code,capacity:o.value.capacity,plate:o.value.plate,documentSeries:o.value.documentSeries},t=k.A.state.token,a=o.value.cisternId;await(0,b.nL)(t,e,a),C.A.emit("success","¡Operación completada con éxito!"),C.A.emit("masterCreated"),l()}catch(e){C.A.emit("error",`Ups... hubo un error al editar el usuario:  ${e.message}`),console.error("Error al actualizar el cisterns:",e.message)}};return{dialog:a,form:o,closeDialog:l,submitForm:n}}},w=a(1241);const E=(0,w.A)(S,[["render",W],["__scopeId","data-v-565f7d1f"]]);var D=E,$=a(8372),L=a(7572),U=a(3194),R={name:"DataTable",components:{EditCisternsForm:D,SuccessAlert:$.A,ErrorAlert:L.A,WarningAlert:U.A},setup(){const e=(0,c.KR)(""),t=(0,c.KR)([]),a=k.A.state.token,o=(0,c.KR)(!1),l=(0,c.KR)(null),n=(0,c.KR)([{align:"start",key:"code",sortable:!1,title:"Código de cisterna"},{key:"plate",title:"Placa"},{key:"capacity",title:"Capacitad"},{key:"documentSeries",title:"Serie de Documento",sortable:!1},{key:"actions",title:"Acciones",sortable:!1}]),i=async()=>{try{const e=await(0,b.a1)(a);t.value=e.data.data}catch(e){console.error("Error al obtener los cisterns:",e)}},s=e=>{l.value=e,o.value=!0},d=()=>{o.value=!1};(0,r.sV)((()=>{i(),C.A.on("masterCreated",i)})),(0,r.xo)((()=>{C.A.off("masterCreated",i)}));const u=(0,r.EW)((()=>{if(!e.value)return t.value;const a=e.value.toLowerCase();return t.value.filter((e=>Object.values(e).some((e=>String(e).toLowerCase().includes(a)))))})),m=e=>{const t=e.cisternId,a=e.username;C.A.emit("warning",{msg:`¿Estás seguro de que deseas eliminar al usuario ${a}?`,action:async()=>{try{const e=k.A.state.token;await(0,b.L0)(e,t),C.A.emit("success","¡Operación completada con éxito!"),i()}catch(e){console.error("Error al eliminar el cisterns:",e)}}})};return{search:e,headers:n,filteredItems:u,openEditForm:s,closeEditForm:d,isEditFormVisible:o,selectCisterns:l,deleteItem:m}}};const K=(0,w.A)(R,[["render",f],["__scopeId","data-v-5778edc6"]]);var q=K;const I=(0,r.Lk)("span",{class:"text-h5 mp-2 mb-4 text-center"},"Crear Nueva Cisterna",-1);function j(e,t,a,o,l,n){return(0,r.uX)(),(0,r.Wv)(V.p,{modelValue:o.dialog,"onUpdate:modelValue":t[4]||(t[4]=e=>o.dialog=e),"max-width":"600px",persistent:""},{default:(0,r.k6)((()=>[(0,r.bF)(d.J,null,{default:(0,r.k6)((()=>[I,(0,r.bF)(h.O,null,{default:(0,r.k6)((()=>[(0,r.bF)(A.n,{onSubmit:(0,F.D$)(o.submitForm,["prevent"])},{default:(0,r.k6)((()=>[(0,r.bF)(p.W,{modelValue:o.form.code,"onUpdate:modelValue":t[0]||(t[0]=e=>o.form.code=e),label:"Código de cisterna","prepend-icon":"mdi mdi-shield-check",required:""},null,8,["modelValue"]),(0,r.bF)(p.W,{modelValue:o.form.plate,"onUpdate:modelValue":t[1]||(t[1]=e=>o.form.plate=e),label:"Placa","prepend-icon":"mdi-tanker-truck",required:""},null,8,["modelValue"]),(0,r.bF)(p.W,{modelValue:o.form.capacity,"onUpdate:modelValue":t[2]||(t[2]=e=>o.form.capacity=e),label:"Capacidad","prepend-icon":"mdi mdi-battery-80",required:""},null,8,["modelValue"]),(0,r.bF)(p.W,{modelValue:o.form.documentSeries,"onUpdate:modelValue":t[3]||(t[3]=e=>o.form.documentSeries=e),label:"Documento asignado","prepend-icon":"mdi-card",required:""},null,8,["modelValue"]),(0,r.bF)(y.S,{class:"justify-end"},{default:(0,r.k6)((()=>[(0,r.bF)(v.D,{text:"",onClick:o.closeDialog,color:"#180c24"},{default:(0,r.k6)((()=>[(0,r.eW)("Cancelar")])),_:1},8,["onClick"]),(0,r.bF)(v.D,{type:"submit",color:"#ff8c54"},{default:(0,r.k6)((()=>[(0,r.eW)("Guardar")])),_:1})])),_:1})])),_:1},8,["onSubmit"])])),_:1})])),_:1})])),_:1},8,["modelValue"])}var O={emits:["close"],setup(e,{emit:t}){const a=(0,c.KR)(!0),r=(0,c.KR)({username:"",capacity:"",plate:"",documentSeries:""}),o=()=>{t("close")},l=async()=>{const e=k.A.state.token,t={code:r.value.code,capacity:r.value.capacity,plate:r.value.plate,documentSeries:r.value.documentSeries};try{await(0,b.GR)(e,t),C.A.emit("success","¡Operación completada con éxito!"),C.A.emit("masterCreated"),o()}catch(a){C.A.emit("error",`Ups... hubo un error al crear el usuario:  ${a.message}`)}};return{dialog:a,form:r,closeDialog:o,submitForm:l}}};const B=(0,w.A)(O,[["render",j]]);var X=B,z={components:{DataTable:q,CreateCisternsForm:X},setup(){const e=(0,c.KR)(!1),t=()=>{e.value=!0},a=()=>{e.value=!1};return{isCreateFormVisible:e,openCreateForm:t,closeCreateForm:a}}};const G=(0,w.A)(z,[["render",s],["__scopeId","data-v-8e9a4c34"]]);var P=G}}]);
//# sourceMappingURL=356.6119e4d6.js.map