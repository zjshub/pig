package cn.itcast.ssm.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import cn.itcast.ssm.controller.validation.ValidGroup1;
import cn.itcast.ssm.po.ItemsCustom;
import cn.itcast.ssm.po.ItemsQueryVo;
import cn.itcast.ssm.service.ItemsService;


/**
 * 
 * <p>
 * Title: ItemsController
 * </p>
 * <p>
 * Description:閸熷棗鎼ч惃鍒ntroller
 * </p> 
 * <p>
 * Company: www.itcast.com
 * </p>
 * 
 * @author 娴肩姵娅�.閻曟洟娼�
 * @date 2015-4-13娑撳宕�4:03:35
 * @version 1.0
 */
@Controller
// 娑撹桨绨＄�电畡rl鏉╂稖顢戦崚鍡欒缁狅紕鎮� 閿涘苯褰叉禒銉ユ躬鏉╂瑩鍣风�规矮绠熼弽纭呯熅瀵板嫸绱濋張锟界矒鐠佸潡妫秛rl閺勵垱鐗寸捄顖氱窞+鐎涙劘鐭惧锟�
// 濮ｆ柨顪嗛敍姘櫌閸濅礁鍨悰顭掔窗/items/queryItems.action
@RequestMapping("/items")
public class ItemsController {

	@Autowired
	private ItemsService itemsService;

	// 閸熷棗鎼ч崚鍡欒
	//itemtypes鐞涖劎銇氶張锟界矒鐏忓棙鏌熷▔鏇＄箲閸ョ偛锟介弨鎯ф躬request娑擃厾娈慿ey
	@ModelAttribute("itemtypes")
	public Map<String, String> getItemTypes() {

		Map<String, String> itemTypes = new HashMap<String, String>();
		itemTypes.put("101", "asdasdad");
		itemTypes.put("102", "asdasd");

		return itemTypes;
	}

	// 閸熷棗鎼ч弻銉嚄
	@RequestMapping("/queryItems")
	public ModelAndView queryItems(HttpServletRequest request,
			ItemsQueryVo itemsQueryVo) throws Exception {
		// 濞村鐦痜orward閸氬窎equest閺勵垰鎯侀崣顖欎簰閸忓彉闊�

		System.out.println(request.getParameter("id"));

		// 鐠嬪啰鏁ervice閺屻儲澹� 閺佺増宓佹惔鎿勭礉閺屻儴顕楅崯鍡楁惂閸掓銆�
		List<ItemsCustom> itemsList = itemsService.findItemsList(itemsQueryVo);

		// 鏉╂柨娲朚odelAndView
		ModelAndView modelAndView = new ModelAndView();
		// 閻╃缍� 娴滃窎equest閻ㄥ墕etAttribut閿涘苯婀猨sp妞ょ敻娼版稉顓拷鏉╁檮temsList閸欐牗鏆熼幑锟�
		modelAndView.addObject("itemsList", itemsList);

		// 閹稿洤鐣剧憴鍡楁禈
		// 娑撳绔熼惃鍕熅瀵板嫸绱濇俊鍌涚亯閸︺劏顬呴崶鎹愋掗弸鎰珤娑擃參鍘ょ純鐢箂p鐠侯垰绶為惃鍕缂傦拷鎷癹sp鐠侯垰绶為惃鍕倵缂傦拷绱濇穱顔芥暭娑擄拷
		// modelAndView.setViewName("/WEB-INF/jsp/items/itemsList.jsp");
		// 娑撳﹨绔熼惃鍕熅瀵板嫰鍘ょ純顔煎讲娴犮儰绗夐崷銊р柤鎼村繋鑵戦幐鍥х暰jsp鐠侯垰绶為惃鍕缂傦拷鎷癹sp鐠侯垰绶為惃鍕倵缂傦拷
		modelAndView.setViewName("items/itemsList");

		return modelAndView;

	}

	// 閸熷棗鎼ф穱鈩冧紖娣囶喗鏁兼い鐢告桨閺勫墽銇�
	// @RequestMapping("/editItems")
	// 闂勬劕鍩梙ttp鐠囬攱鐪伴弬瑙勭《閿涘苯褰叉禒顨峯st閸滃疅et
	// @RequestMapping(value="/editItems",method={RequestMethod.POST,RequestMethod.GET})
	// public ModelAndView editItems()throws Exception {
	//
	// //鐠嬪啰鏁ervice閺嶈宓侀崯鍡楁惂id閺屻儴顕楅崯鍡楁惂娣団剝浼�
	// ItemsCustom itemsCustom = itemsService.findItemsById(1);
	//
	// // 鏉╂柨娲朚odelAndView
	// ModelAndView modelAndView = new ModelAndView();
	//
	// //鐏忓棗鏅㈤崫浣蜂繆閹垱鏂侀崚鐧縪del
	// modelAndView.addObject("itemsCustom", itemsCustom);
	//
	// //閸熷棗鎼ф穱顔芥暭妞ょ敻娼�
	// modelAndView.setViewName("items/editItems");
	//
	// return modelAndView;
	// }

	@RequestMapping(value = "/editItems", method = { RequestMethod.POST,
			RequestMethod.GET })
	// @RequestParam闁插矁绔熼幐鍥х暰request娴肩姴鍙嗛崣鍌涙殶閸氬秶袨閸滃苯鑸伴崣鍌濈箻鐞涘瞼绮︾�规哎锟�
	// 闁俺绻價equired鐏炵偞锟介幐鍥х暰閸欏倹鏆熼弰顖氭儊韫囧懘銆忕憰浣风炊閸忥拷
	// 闁俺绻僤efaultValue閸欘垯浜掔拋鍓х枂姒涙顓婚崐纭风礉婵″倹鐏塱d閸欏倹鏆熷▽鈩冩箒娴肩姴鍙嗛敍灞界殺姒涙顓婚崐鐓庢嫲瑜般垹寮紒鎴濈暰閵嗭拷
	public String editItems(Model model,
			@RequestParam(value = "id", required = true) Integer items_id)
			throws Exception {

		// 鐠嬪啰鏁ervice閺嶈宓侀崯鍡楁惂id閺屻儴顕楅崯鍡楁惂娣団剝浼�
		ItemsCustom itemsCustom = itemsService.findItemsById(items_id);
		//閸掋倖鏌囬崯鍡楁惂閺勵垰鎯佹稉铏光敄閿涘本鐗撮幑鐢禿濞屸剝婀侀弻銉嚄閸掓澘鏅㈤崫渚婄礉閹舵稑鍤鍌氱埗閿涘本褰佺粈铏规暏閹村嘲鏅㈤崫浣蜂繆閹垯绗夌�涳拷閸︼拷
//		if(itemsCustom == null){
//			throw new CustomException("娣囶喗鏁奸惃鍕櫌閸濅椒淇婇幁顖欑瑝鐎涙ê婀�!");
//		}

		// 闁俺绻冭ぐ銏犲棘娑擃厾娈憁odel鐏忓攲odel閺佺増宓佹导鐘插煂妞ょ敻娼�
		// 閻╃缍嬫禍宸憃delAndView.addObject閺傝纭�
		model.addAttribute("items", itemsCustom);

		return "items/editItems";
	}
	
	//閺屻儴顕楅崯鍡楁惂娣団剝浼呴敍宀冪翻閸戠皜son
	///itemsView/{id}闁插矁绔熼惃鍓搃d}鐞涖劎銇氶崡鐘辩秴缁楋讣绱濋柅姘崇箖@PathVariable閼惧嘲褰囬崡鐘辩秴缁楋缚鑵戦惃鍕棘閺佸府绱�
	//婵″倹鐏夐崡鐘辩秴缁楋缚鑵戦惃鍕倳缁夋澘鎷拌ぐ銏犲棘閸氬秳绔撮懛杈剧礉閸λ奝athVariable閸欘垯浜掓稉宥嗗瘹鐎规艾鎮曠粔锟�
	@RequestMapping("/itemsView/{id}")
	public @ResponseBody ItemsCustom itemsView(@PathVariable("id") Integer id)throws Exception{
		
		//鐠嬪啰鏁ervice閺屻儴顕楅崯鍡楁惂娣団剝浼�
		ItemsCustom itemsCustom = itemsService.findItemsById(id);
		
		return itemsCustom;
		
	}
	

	// 閸熷棗鎼ф穱鈩冧紖娣囶喗鏁奸幓鎰唉
	// 閸︺劑娓剁憰浣圭墡妤犲瞼娈憄ojo閸撳秷绔熷ǎ璇插@Validated閿涘苯婀棁锟筋渽閺嶏繝鐛欓惃鍒緊jo閸氬氦绔熷ǎ璇插BindingResult
	// bindingResult閹恒儲鏁归弽锟犵崣閸戞椽鏁婃穱鈩冧紖
	// 濞夈劍鍓伴敍娆疺alidated閸滃瓓indingResult bindingResult閺勵垶鍘ょ�电懓鍤悳甯礉楠炴湹绗栬ぐ銏犲棘妞ゅ搫绨弰顖氭祼鐎规氨娈戦敍鍫滅閸撳秳绔撮崥搴礆閵嗭拷
	// value={ValidGroup1.class}閹稿洤鐣炬担璺ㄦ暏ValidGroup1閸掑棛绮嶉惃锟介弽锟犵崣
	// @ModelAttribute閸欘垯浜掗幐鍥х暰pojo閸ョ偞妯夐崚浼淬�夐棃銏犳躬request娑擃厾娈慿ey
	@RequestMapping("/editItemsSubmit")
	public String editItemsSubmit(
			Model model,
			HttpServletRequest request,
			Integer id,
			@ModelAttribute("items") @Validated(value = { ValidGroup1.class }) ItemsCustom itemsCustom,
			BindingResult bindingResult,
			MultipartFile items_pic//閹恒儲鏁归崯鍡楁惂閸ュ墽澧�
			) throws Exception {

		// 閼惧嘲褰囬弽锟犵崣闁挎瑨顕ゆ穱鈩冧紖
		if (bindingResult.hasErrors()) {
			// 鏉堟挸鍤柨娆掝嚖娣団剝浼�
			List<ObjectError> allErrors = bindingResult.getAllErrors();

			for (ObjectError objectError : allErrors) {
				// 鏉堟挸鍤柨娆掝嚖娣団剝浼�
				System.out.println(objectError.getDefaultMessage());

			}
			// 鐏忓棝鏁婄拠顖欎繆閹垯绱堕崚浼淬�夐棃锟�
			model.addAttribute("allErrors", allErrors);
			
			
			//閸欘垯浜掗惄瀛樺复娴ｈ法鏁odel鐏忓棙褰佹禍顦jo閸ョ偞妯夐崚浼淬�夐棃锟�
			model.addAttribute("items", itemsCustom);
			
			// 閸戞椽鏁婇柌宥嗘煀閸掓澘鏅㈤崫浣锋叏閺�褰掋�夐棃锟�
			return "items/editItems";
		}
		//閸樼喎顬婇崥宥囆�
		String originalFilename = items_pic.getOriginalFilename();
		//娑撳﹣绱堕崶鍓у
		if(items_pic!=null && originalFilename!=null && originalFilename.length()>0){
			
			//鐎涙ê鍋嶉崶鍓у閻ㄥ嫮澧块悶鍡氱熅瀵帮拷
			String pic_path = "F:\\develop\\upload\\temp\\";
			
			
			//閺傛壆娈戦崶鍓у閸氬秶袨
			String newFileName = UUID.randomUUID() + originalFilename.substring(originalFilename.lastIndexOf("."));
			//閺傛澘娴橀悧锟�
			File newFile = new File(pic_path+newFileName);
			
			//鐏忓棗鍞寸�涙ü鑵戦惃鍕殶閹诡喖鍟撻崗銉ь棐閻╋拷
			items_pic.transferTo(newFile);
			
			//鐏忓棙鏌婇崶鍓у閸氬秶袨閸愭瑥鍩宨temsCustom娑擄拷
			itemsCustom.setPic(newFileName);
			
		}
		

		// 鐠嬪啰鏁ervice閺囧瓨鏌婇崯鍡楁惂娣団剝浼呴敍宀勩�夐棃銏ゆ付鐟曚礁鐨㈤崯鍡楁惂娣団剝浼呮导鐘插煂濮濄倖鏌熷▔锟�
		itemsService.updateItems(id, itemsCustom);

		// 闁插秴鐣鹃崥鎴濆煂閸熷棗鎼ч弻銉嚄閸掓銆�
		// return "redirect:queryItems.action";
		// 妞ょ敻娼版潪顒�褰�
		// return "forward:queryItems.action";
		return "success";
	}

	// 閹靛綊鍣洪崚鐘绘珟 閸熷棗鎼ф穱鈩冧紖
	@RequestMapping("/deleteItems")
	public String deleteItems(Integer[] items_id) throws Exception {

		// 鐠嬪啰鏁ervice閹靛綊鍣洪崚鐘绘珟閸熷棗鎼�
		// ...

		return "success";

	}

	// 閹靛綊鍣烘穱顔芥暭閸熷棗鎼фい鐢告桨閿涘苯鐨㈤崯鍡楁惂娣団剝浼呴弻銉嚄閸戠儤娼甸敍灞芥躬妞ょ敻娼版稉顓炲讲娴犮儳绱潏鎴濇櫌閸濅椒淇婇幁锟�
	@RequestMapping("/editItemsQuery")
	public ModelAndView editItemsQuery(HttpServletRequest request,
			ItemsQueryVo itemsQueryVo) throws Exception {

		// 鐠嬪啰鏁ervice閺屻儲澹� 閺佺増宓佹惔鎿勭礉閺屻儴顕楅崯鍡楁惂閸掓銆�
		List<ItemsCustom> itemsList = itemsService.findItemsList(itemsQueryVo);

		// 鏉╂柨娲朚odelAndView
		ModelAndView modelAndView = new ModelAndView();
		// 閻╃缍� 娴滃窎equest閻ㄥ墕etAttribut閿涘苯婀猨sp妞ょ敻娼版稉顓拷鏉╁檮temsList閸欐牗鏆熼幑锟�
		modelAndView.addObject("itemsList", itemsList);

		modelAndView.setViewName("items/editItemsQuery");

		return modelAndView;

	}

	// 閹靛綊鍣烘穱顔芥暭閸熷棗鎼ч幓鎰唉
	// 闁俺绻僆temsQueryVo閹恒儲鏁归幍褰掑櫤閹绘劒姘﹂惃鍕櫌閸濅椒淇婇幁顖ょ礉鐏忓棗鏅㈤崫浣蜂繆閹垰鐡ㄩ崒銊ュ煂itemsQueryVo娑撶挶temsList鐏炵偞锟芥稉顓滐拷
	@RequestMapping("/editItemsAllSubmit")
	public String editItemsAllSubmit(ItemsQueryVo itemsQueryVo)
			throws Exception {

		return "success";
	}

}
