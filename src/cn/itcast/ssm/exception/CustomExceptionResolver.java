package cn.itcast.ssm.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * <p>Title: CustomExceptionResolver</p>
 * <p>Description:鍏ㄥ眬寮傚父澶勭悊鍣� </p>
 * <p>Company: www.itcast.com</p> 
 * @author	浼犳櫤.鐕曢潚
 * @date	2015-4-14涓婂崍11:57:09
 * @version 1.0
 */
public class CustomExceptionResolver implements HandlerExceptionResolver {

	/**
	 * 锛堥潪 Javadoc锛�
	 * <p>Title: resolveException</p>
	 * <p>Description: </p>
	 * @param request
	 * @param response
	 * @param handler
	 * @param ex 绯荤粺 鎶涘嚭鐨勫紓甯�
	 * @return
	 * @see org.springframework.web.servlet.HandlerExceptionResolver#resolveException(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, java.lang.Exception)
	 */
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		//handler灏辨槸澶勭悊鍣ㄩ�傞厤鍣ㄨ鎵цHandler瀵硅薄锛堝彧鏈塵ethod锛�
		
//		瑙ｆ瀽鍑哄紓甯哥被鍨�
//		濡傛灉璇� 寮傚父绫诲瀷鏄郴缁� 鑷畾涔夌殑寮傚父锛岀洿鎺ュ彇鍑哄紓甯镐俊鎭紝鍦ㄩ敊璇〉闈㈠睍绀�
//		String message = null;
//		if(ex instanceof CustomException){
//			message = ((CustomException)ex).getMessage();
//		}else{
////			濡傛灉璇� 寮傚父绫诲瀷涓嶆槸绯荤粺 鑷畾涔夌殑寮傚父锛屾瀯閫犱竴涓嚜瀹氫箟鐨勫紓甯哥被鍨嬶紙淇℃伅涓衡�滄湭鐭ラ敊璇�濓級
//			message="鏈煡閿欒";
//		}
		
		//涓婅竟浠ｇ爜鍙樹负
		CustomException customException = null;
		if(ex instanceof CustomException){
			customException = (CustomException)ex;
		}else{
			customException = new CustomException("错误");
		}
		
		//閿欒淇℃伅
		String message = customException.getMessage();
		
		
		ModelAndView modelAndView = new ModelAndView();
		
		//灏嗛敊璇俊鎭紶鍒伴〉闈�
		modelAndView.addObject("message", message);
		
		//鎸囧悜閿欒椤甸潰
		modelAndView.setViewName("error");

		
		return modelAndView;
	}

}
