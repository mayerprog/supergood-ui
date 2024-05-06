import 'package:dio/dio.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:pizzarf_flutter/common/constants.dart';
import 'package:retrofit/retrofit.dart';
import 'package:pizzarf_flutter/data/remote/dto/bonus/bonus_dto.dart';
import 'package:pizzarf_flutter/data/remote/dto/courier_position.dart';
import 'package:pizzarf_flutter/data/remote/dto/getitems/items_dto.dart';

import 'package:payselection_sdk/payselection.dart';

import 'dto/getpromotions/promotions_dto.dart';
import 'dto/auth/registration_dto.dart';
import 'dto/auth/sms_dto.dart';

part 'super_good_api.g.dart';

@RestApi(baseUrl: "http://176.99.7.81:8000/")
abstract class PizzaApi {
  factory PizzaApi(Dio dio) = _PizzaApi;

  @POST("getItems")
  Future<ItemsDto> getItems(
    @Field("token") String? token,
    @Field("hash") String? hash,
    @Field("deptId") int? deptId,
  );
}

@RestApi(baseUrl: Constants.apiHost)
abstract class SuperGoodApi {
  factory SuperGoodApi(Dio dio) = _SuperGoodApi;

  // @POST("getitems.php")
  // @FormUrlEncoded()
  // Future<ItemsDto> getItems(
  //   @Header("telephonyId") String telephonyId,
  //   @Field("token") String? token,
  //   @Field("hash") String? hash,
  //   @Field("deptId") int? deptId,
  // );

  @POST("getitems.php")
  @FormUrlEncoded()
  Future<String> getClosedKitchen(
    @Header("telephonyId") String telephonyId,
    @Field("token") String? token,
    @Field("hash") String? hash,
    @Field("deptId") int? deptId,
  );

  @POST("getpromotions.php")
  @FormUrlEncoded()
  Future<PromotionsDto> getPromotions(
    @Header("telephonyId") String telephonyId,
    @Field("token") String? token,
    @Field("hash") String? hash,
    @Field("deptId") int? deptId,
  );

  @GET("getFileNew.php")
  Future<String> getImage(@Query("uid") String uid);

  @POST("auth.php")
  @FormUrlEncoded()
  Future<RegistrationDto> getSms(
    @Header("telephonyId") String telephonyId,
    @Field("phone") String phone,
    @Field('code') String code,
    @Field("token") String token,
    @Field("os_source") String os,
  );

  @POST("auth.php")
  @FormUrlEncoded()
  Future<SmsDto> verifySms(
    @Header("telephonyId") String telephonyId,
    @Field("phone") String phone,
    @Field('code') String code,
    @Field("token") String token,
  );

  @POST("getpoly.php")
  @FormUrlEncoded()
  Future<String> getPoly(
    @Header("telephonyId") String telephonyId,
    @Field("deptid") int deptid,
  );

  // for minor areas
  @POST("getpolyfew.php")
  @FormUrlEncoded()
  Future<String> getPolyFew(
    @Header("telephoyId") String telephonyId,
    @Field("deptid") int deptid,
  );

  @POST("getaddress.php")
  @FormUrlEncoded()
  Future<String> getAddress(
    @Header("telephonyId") String telephonyId,
    @Field("lat") double lat,
    @Field("long") double long,
  );

  @POST("getaddress.php")
  @FormUrlEncoded()
  Future<String> getAddresses(
    @Header("telephonyId") String telepgonyId,
    @Field("street") String street,
  );

  @POST("getaddress.php")
  @FormUrlEncoded()
  Future<String> getHouse(
    @Header("telephonyId") String telepgonyId,
    @Field("streetid") String streetId,
    @Field("house") String house,
  );

  @POST("getaddress.php")
  @FormUrlEncoded()
  Future<String> getAddressById(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("addressid") String addressId,
  );

  @POST("saveaddress.php")
  @FormUrlEncoded()
  Future<String> saveAddress(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("street") String street,
    @Field("lat") double lat,
    @Field("long") double long,
    @Field("addressid") int? addressId,
    @Field("streetid") int streetId,
    @Field("houseid") int houseId,
    @Field("entrance") String? entrance,
    @Field("floor") String? floor,
    @Field("flat") String? flat,
    @Field("description") String description,
    @Field("selected") bool selected,
  );

  @POST("saveaddress.php")
  @FormUrlEncoded()
  Future<String> deleteAddress(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("addressid") int? addressId,
    @Field("status") int status,
  );

  @POST("getuserpref.php")
  @FormUrlEncoded()
  Future<String> getUserPref(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
  );

  @FormUrlEncoded()
  @POST("saveusername.php")
  Future<String> saveUserName(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("name") String name,
  );

  @FormUrlEncoded()
  @POST("saveuseremail.php")
  Future<String> saveUserEmail(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("email") String email,
  );

  @FormUrlEncoded()
  @POST("saveuserbirth.php")
  Future<String> saveUserBirthday(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("birthday") String birthday,
  );

  //--------- order and basket ----------------

  // get basket
  @FormUrlEncoded()
  @POST("getsalesinfo.php")
  Future<String> getOrderInfo(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("salesid") String orderId,
  );

  // add to basket
  @POST("putcart.php")
  @FormUrlEncoded()
  Future<String> addToBasket(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("salesid") String salesid, // id заказа
    @Field("id") int id, // id позиции в таблице на сервере | SET TO 0
    @Field("itemid") int itemid, //id товара
    @Field("deptid") int deptid, //id филиала
    @Field("qty") int qty, // количество
  );

  // delete entire instance from basket
  @POST("deletecart.php")
  @FormUrlEncoded()
  Future<String> deleteInstanceFromBasket(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("salesid") String salesid, // id of order
    @Field("id") int lineId, // id of item in the server
  );

  @FormUrlEncoded()
  @POST("getsales.php")
  Future<String> getOrders(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
  );

  // --------- order -----------

  @FormUrlEncoded()
  @POST("getpaymtypes.php")
  Future<String> getPayments(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("deptid") int deptId,
  );

  //typeid,name
  //'1','Наличными'
  //'2','Безналичный расчет'
  //'11','CloudPayments'
  //'12','Пластиковая карта'
  //'13','Platron'
  //'14','Сертификат'
  //'15','Fondy'
  //'16','Картой курьеру'
  //'19','Баллы SG'
  //'20','ApplePay Cloud'
  //'21','GooglePay'
  //'22','Альфа СБП'

  @FormUrlEncoded()
  @POST("getbalance.php")
  Future<BonusDto> getBonus(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
  );

  @FormUrlEncoded()
  @POST("getbalancelevel.php")
  Future<String> getLoyalty(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
  );

  // post order, and if paying online, then needed to be payed
  @FormUrlEncoded()
  @POST("orderpost.php")
  Future<String> orderPost(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("salesid") String salesid,
    @Field("addressid") String addressId,
    @Field("nocontact") int contactLess,
    @Field("payamount") int payamount,
    @Field("points") int points,
    @Field("changeamount") int changeAmount,
    @Field("paytype") int payType,
    @Field("description") String description,
    @Field("dlvtime") int dlvtime,
    @Field("fcm_token") String fcmToken,
    @Field("minor_area_id") int minorAreaId,
  );

  @FormUrlEncoded()
  @POST("setfcm.php")
  Future<String> postFcmToken(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("fcm_token") String fcmToken,
  );

  // get public id to generate cryptogram to pay online
  // @FormUrlEncoded()
  // @POST("cloudpayment.php?c=getaction")
  // Future<String> getAction(
  //   @Header("telephonyId") String telephonyId,
  //   @Field("token") String token,
  //   @Field("hash") String hash,
  //   @Field("salesid") orderID,
  // );
  //
  // // get saved cards
  // @FormUrlEncoded()
  // @POST("cloudpayment.php?c=getcards")
  // Future<String> getCards(
  //   @Header("telephonyId") String telephonyId,
  //   @Field("token") String token,
  //   @Field("hash") String hash,
  // );

  // pay with a new card
  // @FormUrlEncoded()
  // @POST("cloudpayment.php?c=sendpay")
  // Future<String> sendPay(
  //   @Header("telephonyId") String telephonyId,
  //   @Field("token") String token,
  //   @Field("hash") String hash,
  //   @Field("salesid") String salesId,
  //   @Field("CardCryptogramPacket") String crypto,
  // );

  // pay with existing card
  // @FormUrlEncoded()
  // @POST("cloudpayment.php?c=sendrepay")
  // Future<String> sendRePay(
  //   @Header("telephonyId") String telephonyId,
  //   @Field("token") String token,
  //   @Field("hash") String hash,
  //   @Field("salesid") String orderID,
  //   @Field("usercard") String cardID,
  // );

  @FormUrlEncoded()
  @POST("getsalestatus.php")
  Future<String> getOrderStatus(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("salesid") String orderId,
  );

  @FormUrlEncoded()
  @POST("setstatus.php")
  Future<String> setStatus(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("salesid") String orderID,
    @Field("status") int status,
  );

  @FormUrlEncoded()
  @POST("setpromo.php")
  Future<String> setPromoCode(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("salesid") String orderId,
    @Field("deptid") int deptId,
    @Field("promo") String promo,
  );

  @FormUrlEncoded()
  @POST("getavailalegifts.php")
  Future<String> getGifts(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("deptid") int deptid,
    @Field("salesid") String salesid,
  );

  @FormUrlEncoded()
  @POST("repost.php")
  Future<String> repostOrder(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("salesid") String orderId,
  );

  // get courier position
  @FormUrlEncoded()
  @POST("getcourierposition.php")
  Future<CourierPosition> getCourierPosition(
    @Header("telephonyId") String telephonyId,
    @Field("token") String token,
    @Field("hash") String hash,
    @Field("salesid") String orderID,
  );

  @GET("/certificate/activate/{certificate}/{userId}")
  Future<String> setCertificate(@Header("telephonyId") String telephonyId,
      @Path("certificate") String certificate, @Path("userId") int userId);

  @FormUrlEncoded()
  @POST("setcorpreq.php")
  Future<String> sendCorpRequest(
      @Header("telephonyId") String telephonyId,
      //@Field("inn") inn: String,
      //@Field("organization") organization: String,
      @Field("name") String name,
      //@Field("email") email: String,
      @Field("phone") String phone,
      //@Field("address") address: String,
      @Field("comment") String? comment,
      @Field("test_menu") int testMenu
      // @Field("devmail") devmail: String
      );
}
