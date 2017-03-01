package cn.itcast.ssm.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import cn.itcast.ssm.exception.CustomException;
import cn.itcast.ssm.mapper.ItemsMapper;
import cn.itcast.ssm.mapper.ItemsMapperCustom;
import cn.itcast.ssm.po.Items;
import cn.itcast.ssm.po.ItemsCustom;
import cn.itcast.ssm.po.ItemsQueryVo;
import cn.itcast.ssm.service.ItemsService;

/**
 * 
 * <p>Title: ItemsServiceImpl</p>
 * <p>Description: 鍟嗗搧绠＄悊</p>
 * <p>Company: www.itcast.com</p> 
 * @author	浼犳櫤.鐕曢潚
 * @date	2015-4-13涓嬪崍3:49:54
 * @version 1.0
 */
public class ItemsServiceImpl implements ItemsService{
	
	@Autowired
	private ItemsMapperCustom itemsMapperCustom;
	
	@Autowired
	private ItemsMapper itemsMapper;

	@Override
	public List<ItemsCustom> findItemsList(ItemsQueryVo itemsQueryVo)
			throws Exception {
		//閫氳繃ItemsMapperCustom鏌ヨ鏁版嵁搴�
		return itemsMapperCustom.findItemsList(itemsQueryVo);
	}

	@Override
	public ItemsCustom findItemsById(Integer id) throws Exception {
		
		Items items = itemsMapper.selectByPrimaryKey(id);
		if(items==null){
			throw new CustomException("空的");
		}
		//涓棿瀵瑰晢鍝佷俊鎭繘琛屼笟鍔″鐞�
		//....
		//杩斿洖ItemsCustom
		ItemsCustom itemsCustom = null;
		//灏唅tems鐨勫睘鎬у�兼嫹璐濆埌itemsCustom
		if(items!=null){
			itemsCustom = new ItemsCustom();
			BeanUtils.copyProperties(items, itemsCustom);
		}
		
		
		return itemsCustom;
		
	}

	@Override
	public void updateItems(Integer id, ItemsCustom itemsCustom) throws Exception {
		//娣诲姞涓氬姟鏍￠獙锛岄�氬父鍦╯ervice鎺ュ彛瀵瑰叧閿弬鏁拌繘琛屾牎楠�
		//鏍￠獙 id鏄惁涓虹┖锛屽鏋滀负绌烘姏鍑哄紓甯�
		
		//鏇存柊鍟嗗搧淇℃伅浣跨敤updateByPrimaryKeyWithBLOBs鏍规嵁id鏇存柊items琛ㄤ腑鎵�鏈夊瓧娈碉紝鍖呮嫭 澶ф枃鏈被鍨嬪瓧娈�
		//updateByPrimaryKeyWithBLOBs瑕佹眰蹇呴』杞叆id
		itemsCustom.setId(id);
		itemsMapper.updateByPrimaryKeyWithBLOBs(itemsCustom);
	}

}
